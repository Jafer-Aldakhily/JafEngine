import React,{ useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
export default function Logout() {
    const {setAuth} = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        setAuth(false)
        navigate('/login')
    },[])
  return (
    <div>
      
    </div>
  )
}
