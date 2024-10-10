"use client"
import React, { MouseEvent, useState } from 'react'
import { Fugaz_One } from 'next/font/google'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'

const fugaz = Fugaz_One({subsets:["latin"],weight:"400"})



const Login = () => {
   const [isLogin, setLogin] = useState(true)
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [authenticating, setauthenticating] = useState(false)
    const {signUp,login} = useAuth()


   const handleSubmit = async(e:MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    try {
      if(!email||!password || password.length<6){
        return 
      }
      console.log("here")
      setauthenticating(true)
      if(isLogin){
        console.log("signin")
        await login(email,password)
      }
      else{
        console.log("signup")
        await signUp(email,password)
      }
    } catch (error) {
      console.log(error)
    }finally{setauthenticating(false)}


   }
  return (
   <>
    {isLogin ?  <div className=' flex flex-col flex-1  justify-center items-center gap-4 '>
        <h3 className={`text-4xl sm:text-5xl md:text-6xl `+fugaz.className}>
          Login
        </h3>
        <p>
          you are one step away!
        </p>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' className=' focus:border-indigo-200 w-full max-w-[400px] rounded-full bg-indigo-100 border border-solid border-indigo-300 px-4 py-2 sm:py-3' type="text" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' className=' focus:border-indigo-200 w-full max-w-[400px] rounded-full bg-indigo-100 border border-solid border-indigo-300 px-4 py-2 sm:py-3' type="password" />
       <div className=' w-full max-w-[400px] mx-auto '>
        <Button onClickHandler={handleSubmit} text={authenticating?"Submitting..":"Submit"}  full dark={false}/>
   
       </div>

       <p>
        Don't have an account? <span onClick={()=>setLogin((prev)=>!prev)} className='text-indigo-500 cursor-pointer'>Sign up</span>
       </p>


    </div>
    :
    <div className=' flex flex-col flex-1  justify-center items-center gap-4 '>
    <h3 className={`text-4xl sm:text-5xl md:text-6xl `+fugaz.className}>
      Register
    </h3>
    <p>
      you are one step away!
    </p>
    <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' className=' focus:border-indigo-200 w-full max-w-[400px] rounded-full bg-indigo-100 border border-solid border-indigo-300 px-4 py-2 sm:py-3' type="text" />
    <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' className=' focus:border-indigo-200 w-full max-w-[400px] rounded-full bg-indigo-100 border border-solid border-indigo-300 px-4 py-2 sm:py-3' type="password" />
   <div className=' w-full max-w-[400px] mx-auto '>
    <Button onClickHandler={handleSubmit} text={authenticating?"Submitting..":"Submit"} full dark={false}/>
  
   </div>

   <p>
      Already a user? <span onClick={()=>setLogin((prev)=>!prev)} className=' cursor-pointer text-indigo-500'>Sign In</span>
   </p>


</div>

    } 
   </>
  )
}

export default Login