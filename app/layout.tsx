import type { Metadata } from "next";
import { Fugaz_One,Open_Sans} from 'next/font/google'
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Head from "./head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const fugaz = Fugaz_One({subsets:["latin"],weight:"400"})
const OpenSans = Open_Sans({subsets:["latin"],weight:"400"})

export const metadata: Metadata = {
  title: "Broodl",
  description: "Track your daily mood",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <Head/>
      <body
        className={`
          w-full max-w-[1000px] text-slate-700 mx-auto text-sm sm:text-base min-h-screen flex flex-col
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased`+
          OpenSans.className}
          >
        <AuthProvider>
        <Header>
        <Link href={"/"}> 
          <h1 className={`text-base sm:text-lg textGradient `
            +fugaz.className}>
              Broodl
              </h1>
          </Link>
        </Header>
        {children}
        <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
