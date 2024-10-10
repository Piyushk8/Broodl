'use client'

import React, { FC, useEffect, useState } from 'react'
import { Fugaz_One, Open_Sans } from 'next/font/google'
import Calendar from './Calendar'
import { useAuth } from '@/context/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import Login from './Login'
import Loading from './Loading'

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" })

const Dashboard: FC = () => {
  const { currentUser, userDataDb, setUserDataDb, loading } = useAuth()
  const [data, setData] = useState<{ [key: string]: any }>({});
  
  useEffect(() => {
    if (currentUser && userDataDb) {
      setData(userDataDb);
    }
  }, [userDataDb, currentUser]);
  
  if (loading) {
    return <Loading />
  }
  
  if (!currentUser) {
    return <Login />
  }

  const HandleSetMood = async (mood: string | number) => {
    try {
      console.log(mood)
      const now = new Date()
      const day = now.getDate()
      const month = now.getMonth()
      const year = now.getFullYear()
      
      const newData = { ...userDataDb };
      console.log(day,month,year,newData)
      if (!newData[year]) newData[year] = {};
      if (!newData[year][month]) newData[year][month] = {};
      newData[year][month][day] = mood;
      setData(newData)
      setUserDataDb(newData)
      const docRef = doc(db, 'users', currentUser?.uid);
      await setDoc(docRef, {
        [year]: {
          [month]: {
            [day]: mood
          }
        }
      }, { merge: true })
      console.log(data,userDataDb,docRef)
    } catch (error) {
      console.error("Error setting mood:", error);
    }
  };

  const statuses = {
    num_days: 1,
    time_remaining: "13:14:26",
    date: (new Date()).toDateString()
  }
  
  const moods = {
    "happy": "U+1F601",
    "awesome": "U+1F929",
    "worried": "U+1F61F",
    "sad": "U+1F622",
    "very sad": "U+1F62D"
  }
  
  const getEmoji = (unicode: string) => {
    const codePoint = parseInt(unicode.replace("U+", ""), 16);
    return String.fromCodePoint(codePoint);
  };

  return (
    <div className='flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16'>
      <div className='grid grid-cols-1 sm:grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg'>
        {(Object.keys(statuses) as Array<keyof typeof statuses>).map((status, statusIndex) => (
          <div key={statusIndex} className='p-4 flex flex-col gap-1 sm:gap-2'>
            <p className='truncate text-xs sm:text-sm font-medium uppercase'>{status.replaceAll("_", " ")}</p>
            <p className={`truncate text-base sm:text-lg ${fugaz.className}`}>{statuses[status]}</p>
          </div>
        ))}
      </div>
      <h4 className={`text-center text-4xl sm:text-5xl md:text-6xl ${fugaz.className}`}>
        How do you <span className='textGradient'>feel</span> today?
      </h4>  

      <div className='flex items-stretch flex-wrap gap-4 p-4'>
        {(Object.keys(moods) as Array<keyof typeof moods>).map((mood, moodIndex) => (
          <button 
            key={moodIndex}
            onClick={() => HandleSetMood(moodIndex + 1)} 
            className='purpleShadow hover:bg-indigo-100 rounded-lg duration-200 p-4 bg-indigo-50 flex-1'
          >{moodIndex}
            <p className='text-5xl sm:text-6xl md:text-7xl'>{getEmoji(moods[mood])}</p>
            <p className={`text-indigo-500 ${fugaz.className}`}>{mood}</p>
          </button>
        ))}
      </div>
      <Calendar demo={true} completeData={data} handleSetMood={HandleSetMood} />
    </div>
  )
}

export default Dashboard





// const Dashboard: FC = () => {
  
//   const { currentUser, userDataDb, setUserDataDb, loading } = useAuth()
//   const [data, setData] = useState({})
//   const now = new Date()

//   // function countValues() {
//   //   let total_number_of_days = 0
//   //   let sum_moods = 0
//   //   for (let year in data) {
//   //     for (let month in data[year]) {
//   //       for (let day in data[year][month]) {
//   //         let days_mood = data[year][month][day]
//   //         total_number_of_days++
//   //         sum_moods += days_mood
//   //       }
//   //     }
//   //   }
//   //   return { num_days: total_number_of_days, average_mood: sum_moods / total_number_of_days }
//   // }

//   const statuses = {
//     // ...countValues(),
//     time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
//   }

//   async function handleSetMood(mood:string|number) {
//     const day = now.getDate()
//     const month = now.getMonth()
//     const year = now.getFullYear()

//     try {
//       const newData = { ...userDataDb }
//       if (!newData?.[year]) {
//         newData[year] = {}
//       }
//       if (!newData?.[year]?.[month]) {
//         newData[year][month] = {}
//       }

//       newData[year][month][day] = mood
//       // update the current state
//       setData(newData)
//       // update the global state
//       setUserDataDb(newData)
//       // update firebase
//       //@ts-ignore
//       const docRef = doc(db, 'user', currentUser?.uid);
//       const res = await setDoc(docRef, {
//         [year]: {
//           [month]: {
//             [day]: mood
//           }
//         }
//       }, { merge: true })
//     } catch (err) {
//       console.log('Failed to set data: ', err)
//     }
//   }



//   const moods = {
//     '&*@#$': '😭',
//     'Sad': '🥲',
//     'Existing': '😶',
//     'Good': '😊',
//     'Elated': '😍',
//   }

//   useEffect(() => {
//     if (!currentUser || !userDataDb) {
//       return
//     }
//     setData(userDataDb)
//   }, [currentUser, userDataDb])

//   if (loading) {
//     return <Loading />
//   }

//   if (!currentUser) {
//     return <Login />
//   }

//   return (
//     <div className='flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16'>
//       <div className='grid grid-cols-3 bg-indigo-50 text-indigo-500 p-4 gap-4 rounded-lg'>
//         {Object.keys(statuses).map((status, statusIndex) => {
//           return (
//             <div key={statusIndex} className=' flex flex-col gap-1 sm:gap-2'>
//               <p className='font-medium capitalize text-xs sm:text-sm truncate'>{status.replaceAll('_', ' ')}</p>
//               <p className={'text-base sm:text-lg truncate ' + fugaz.className}>{statuses[status]}{status === 'num_days' ? ' 🔥' : ''}</p>
//             </div>
//           )
//         })}
//       </div>
//       <h4 className={'text-5xl sm:text-6xl md:text-7xl text-center ' + fugaz.className}>
//         How do you <span className='textGradient'>feel</span> today?
//       </h4>
//       <div className='flex items-stretch flex-wrap gap-4'>
//         {Object.keys(moods).map((mood, moodIndex) => {
//           return (
//             <button onClick={() => {
//               const currentMoodValue = moodIndex + 1
//               handleSetMood(currentMoodValue)
//             }} className={'p-4 px-5 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center flex flex-col items-center gap-2 flex-1 '} key={moodIndex}>
//               <p className='text-4xl sm:text-5xl md:text-6xl'>{moods[mood]}</p>
//               <p className={'text-indigo-500 text-xs sm:text-sm md:text-base ' + fugaz.className}>{mood}</p>
//             </button>
//           )
//         })}
//       </div>
//       <Calendar completeData={data} handleSetMood={handleSetMood} />
//     </div>
// )
// }