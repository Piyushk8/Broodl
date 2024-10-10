import React from 'react'
import { Fugaz_One } from 'next/font/google'

const fugaz = Fugaz_One({subsets:["latin"],weight:"400"})


const Footer = () => {
  return (
 <footer className='p-4 sm:p-8 grid place-items-center'>
    <p className={`text-indigo-600 `+fugaz}>
    created with Love
    </p>
 </footer>
  )
}

export default Footer