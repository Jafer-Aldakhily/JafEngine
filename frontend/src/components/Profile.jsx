import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useResultContext } from '../context/ResultContextProvider'
import Loading from './Loading'

export default function Profile() {
    const {isLoading,setisLoading} = useResultContext()
    const user = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) :  JSON.parse(localStorage.getItem("google-user"))
    const userid = JSON.parse(localStorage.getItem("current-user")) ? JSON.parse(localStorage.getItem("current-user")) : JSON.parse(localStorage.getItem("google-current-user")) 
    const [histories,setHistories] = useState([])
    const [userHistory,setUserHistory] = useState([])
    const navigate = useNavigate()

    const fetchUserHistory = async () => {
        setisLoading(true)
        // fetch all history
        await axios.get("http://localhost:5000/history").then(response => {
        setHistories(response.data)
        })
      
        console.log(histories);
      // filtering the history for a loggedIn user
      const result  = histories.filter(history => {
          return history.userid == userid
      })
  
      setUserHistory(result)
      console.log(userHistory);
      setisLoading(false)
    }

    useEffect(() => {
      if(!userid) navigate('/')
      fetchUserHistory()
    },[])

    if(isLoading) return <Loading />

  return (
    <div>
      <div className="p-16">
        <div className="p-8 bg-white shadow mt-24">  
        <div className="grid grid-cols-1 md:grid-cols-3">    
           
              <div className="relative">      
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">  
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>      
              </div>    
              </div>    
              <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                <Link to="/">
                <button  className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  Back to home
                  </button>
                  </Link>
              </div>  </div>  <div className="mt-20 text-center border-b pb-12">    
              <h1 className="text-4xl font-medium text-gray-700">{user?.name ? user?.name : user?.username}</h1>    
              <p className="font-light text-gray-600 mt-3">{user?.email}</p>    
              <p className="mt-8 text-gray-500 text-2xl">Your history</p>  
              </div>  
              <div className="mt-12 flex flex-col justify-center items-center">  
              {
                userHistory?.map(({name,url},index) => {
                  return(
                <div key={index} className='md:w-2/5 w-full'>
                <a href={url} target="_blank">
                  <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                    {name}
                  </p>
                </a>
              </div>
                  )
                })
              }   
              </div></div></div>
    </div>
  )
}
