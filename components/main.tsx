import React,{ReactNode,FC} from 'react'


interface MainProps {
    children: ReactNode;
  }
  

const Main:FC<MainProps> = ({children}) => {
  return (
    <main className='flex flex-1 flex-col'>
        {children}
    </main>
  )
}

export default Main