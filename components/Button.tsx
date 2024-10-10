import React, { FC, MouseEvent, ReactNode } from 'react'
import { Fugaz_One } from 'next/font/google'

const fugaz = Fugaz_One({subsets:["latin"],weight:"400"})

type buttonProps = {
    text:string; 
    dark:boolean;
    full:boolean | null
    onClickHandler?: ((e:MouseEvent<HTMLButtonElement>)=>Promise<void> | null)
}   

const Button:FC<buttonProps> = ({onClickHandler,text,dark,full}) => {


    return (
    <button className={`border border-solid rounded-full 
                    border-indigo-600 overflow-hidden 
                    hover:opacity-60 duration-200` 
                    + (dark ? ' bg-indigo-600 text-white ':' bg-white text-indigo-600 ')
                    +(full?' grid place-items-center w-full ':'')
                }
            onClick={onClickHandler}        
                >
        <p 
            className={`px-6 sm:px-10 whitespace-nowrap py-2    
                    sm:py-3
                `+fugaz.className}
        >{text}</p>
    </button>
  )
}

export default Button