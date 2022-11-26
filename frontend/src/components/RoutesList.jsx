import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'
import Login from './Login'
import Logout from './Logout'
import Profile from './Profile'
import Results from './Results'
import SignUp from './SignUp'
export default function RoutesList() {
  return (
    <div className='p-4'>
      <Routes>
        <Route exact path='/' element={<Navigate to="/search" />} />
        <Route exact path='/search' element={<Results />} />
        <Route exact path='/images' element={<Results />} />
        <Route exact path='/news' element={<Results />} />  
        <Route exact path='/videos' element={<Results />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<SignUp />} />
        <Route exact path='/logout' element={<Logout />} />
        <Route exact path='/about' element={<AboutUs />} />
        <Route exact path='/contact' element={<ContactUs />} />
        <Route exact path='/profile' element={<Profile />} />
      </Routes>
    </div>
  )
}