import { Fugaz_One } from 'next/font/google'
import React from 'react'
import Button from './Button'
import Calendar from './Calendar'
import Link from 'next/link'


const fugaz = Fugaz_One({subsets:["latin"],weight:"400"})

const Hero = () => {

    return (
    <div className='py-4  md:py-10 flex flex-col gap-4 sm:gap-8 '>
        <h1 className={`text-5xl sm:text-6xl md:text-7xl text-center 
            `+fugaz}>
            <span className='textGradient'> Broodl </span>
             helps you track your daily 
             <span className='textGradient'> mood! </span>
        </h1>

        <p className='w-full mx-auto max-w-[600px] text-lg sm:text-xl md: text-center md:text-2xl'>
            Create your mood and see how you feel on
            <span className=' font-semibold'> every day of every year</span>
        </p>

        <div className=' grid grid-cols-2 gap-2 w-fit mx-auto'>
        <Link href={"/dashboard"}>
           <Button  text='Login' dark={true} full/>
        </Link>
        <Link href={"/dashboard"}>
           <Button text='Signup' dark={false} full/>
        </Link>
        </div>

        <Calendar demo={true} completeData={null} handleSetMood={null}/>

    </div>
  )
}

export default Hero