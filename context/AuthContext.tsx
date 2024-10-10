"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, createUserWithEmailAndPassword, Unsubscribe, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

type AuthContextType = {
  currentUser: User | null;
  setUserDataDb:any,
  userDataDb: any; // Consider defining a more specific type
  loading: boolean;
  signUp: (email: string, password: string) => Promise<any> | null;
  login: (email: string, password: string) => Promise<any> | null;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userDataDb, setUserDataDb] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  console.log("auth provider reached");

  const signUp = (email: string, password: string) => {
    if (!email || !password) return null;
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    if (!email || !password) return null;
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUserDataDb(null);
    setCurrentUser(null);
    return signOut(auth);
  };

  useEffect(() => {
    console.log("fetching user");
    let unsubscribe: Unsubscribe | undefined;

    const subscribeToAuthChanges = async () => {
      try {
        unsubscribe = onAuthStateChanged(auth, async (user) => {
          console.log("Auth state changed", user);
          setCurrentUser(user);

          if (user) {
            try {
              const docRef = doc(db, 'user', user.uid);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                console.log("User data found", docSnap.data());
                setUserDataDb(docSnap.data());
              } else {
                console.log("No user data found");
              }
            } catch (error) {
              console.error("Error fetching user data:", error);
            }
          } else {
            console.log("No user found");
            setUserDataDb({});
          }

          setLoading(false);
        });
      } catch (error) {
        console.error("Error subscribing to auth changes:", error);
        setLoading(false);
      }
    };

    subscribeToAuthChanges();
    console.log("after subscribing to auth changes");

    return () => {
      console.log("Cleanup: unsubscribing from auth changes");
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const value: AuthContextType = {
    currentUser,
    setUserDataDb,
    userDataDb,
    loading,
    signUp,
    login,
    logout
  };

  console.log("Rendering AuthProvider", { loading, currentUser: !!currentUser });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };