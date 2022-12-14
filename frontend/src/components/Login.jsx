import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { json, Link, useNavigate } from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {GoogleLogin}from 'react-google-login'
import {gapi}from 'gapi-script'

export default function Login() {


 const {clientId} = useContext(AuthContext)

  const [users,setUsers] = useState([]) 
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const {setProfile} = useContext(AuthContext)
  const navigate = useNavigate()
  const {auth,setAuth,setUserId,username,setUserName} = useContext(AuthContext)

    useEffect(() => {
      const initClient = () => {
            gapi.client.init({
            clientId: clientId,
            scope: ''
          });
       };
       gapi.load('client:auth2', initClient);
   });


   const onSuccess = (res) => {
    console.log('success:', res);
    setProfile(res.profileObj)
    setAuth(true)
    localStorage.setItem("auth",JSON.stringify(true))
    localStorage.setItem("google-user",JSON.stringify(res.profileObj))
    localStorage.setItem("google-current-user",JSON.stringify(res.profileObj.googleId))
    navigate('/')
    };
    const onFailure = (err) => {
    console.log('failed:', err);
    };
  
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.get("http://localhost:5000/users").then(response => {
      const result = response.data
      setUsers(result)
    })
    const user =  users.find(user => {
      return user.email == email && user.password == password
    })
    if(user)
    {
        setAuth(true)
        setUserId(user.id)
        setUserName(user.username)
        localStorage.setItem("auth",JSON.stringify(true))
        localStorage.setItem("user",JSON.stringify(user))
        localStorage.setItem("current-user",JSON.stringify(user.id))
        navigate('/')
    }else{
        alert("Error your credential is worng!")
    }

  }

  return (
    <div>

<section className="relative flex flex-wrap lg:h-screen lg:items-center">
  <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
    <div className="mx-auto max-w-lg text-center">
      <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

      <p className="mt-4 text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
        eaque error neque ipsa culpa autem, at itaque nostrum!
      </p>
    </div>

    <form onSubmit={handleSubmit} className="mx-auto mt-8 mb-0 max-w-md space-y-4">
      <div>
        <label for="email" className="sr-only">Email</label>

        <div className="relative">
          <input
            type="email"
            className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <span className="absolute inset-y-0 right-4 inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
      </div>

      <div>
        <label for="password" className="sr-only">Password</label>
        <div className="relative">
          <input
            type="password"
            className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <span className="absolute inset-y-0 right-4 inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          No account?
          <Link to="/register" className="underline">Sign up</Link>
        </p>

        <button
          type="submit"
          className="ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        >
          Sign in
        </button>
      </div>
      <div className="flex items-center justify-between">
      <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
      />
      </div>
    </form>
  </div>

  <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
    <img
      alt="Welcome"
      src="https://static.vecteezy.com/system/resources/thumbnails/005/195/960/small_2x/curious-woman-looking-far-away-with-hand-over-head-trying-to-see-something-bad-vision-searching-holding-palm-on-forehead-and-gasping-surprised-and-amazed-concept-illustration-free-vector.jpg"
      className="absolute inset-0 h-full w-full object-cover"
    />
  </div>
</section>

    </div>
  )
}
