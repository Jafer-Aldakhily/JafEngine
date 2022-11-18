import React, { useEffect, useState } from 'react'
import {useDebounce} from 'use-debounce'
import { useResultContext } from '../context/ResultContextProvider'
import Links from './Links'
export default function Search() {
  const [text,setText] = useState('Elon Musk')
  const {setSearchTerm} = useResultContext()
  const [debouncedValue] = useDebounce(text,300)

  useEffect(() => {
      if(debouncedValue) setSearchTerm(debouncedValue)
  },[debouncedValue])
  return (
    <div className='mx-auto sm:-mt-10 mt-3'>
      <input 
      type="text" 
      value={text}
      className='sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg'
      placeholder='Search JafEngine or url'
      onChange={(e) => setText(e.target.value)}
      />
      {
        !text && (
          <button type='button' className="absolute top-1.5 right-4 text-2xl text-gray-500" onClick={() => setText('')}>
            X
          </button>
        )
      }
      <Links />
    </div>
  )
}