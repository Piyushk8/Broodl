import React, { FC, ReactNode } from 'react'

type HeaderProp={
    children:ReactNode
}

const Header:FC<HeaderProp> = ({children}) => {
  return (
    <header className='p-4 sm:p-8 flex items-center justify-between 
        gap-4    
    '>{children} 
      <div className='flex items-center justify-between '>
        placeHolder
      </div>
    </header>
  )
}

export default Header