import React, { useEffect, useState } from 'react'
import {useDebounce} from 'use-debounce'
import { useResultContext } from '../context/ResultContextProvider'
import Links from './Links'
export default function Search() {
  const [text,setText] = useState()
  const {setSearchTerm} = useResultContext()
  const [debouncedValue] = useDebounce(text,300)

  useEffect(() => {
      if(debouncedValue) setSearchTerm(debouncedValue)
  },[debouncedValue])
  return (
    <div className='md:mx-auto sm:-mt-10 mt-3 md:w-screen md:px-32'>
      <input 
      type="text" 
      value={text}
      className='sm:w-96 md:w-full h-10 md:flex md:justify-self-center md:items-center dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg'
      placeholder='Search JafEngine or url'
      onChange={(e) => setText(e.target.value)}
      />
      {
        // !text && (
        //   <button type='button' className="absolute top-1.5 right-4 text-2xl text-gray-500" onClick={() => setText('')}>
        //     X
        //   </button>
        // )
      }
      <Links />
    </div>
  )
}
