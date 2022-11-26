import React from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { GoogleLogout } from 'react-google-login';
import {Dropdown,Avatar} from 'flowbite-react'
export default function Navbar({darkTheme,setDarkTheme}) {
  const user = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : JSON.parse(localStorage.getItem("google-user"))
  const navigate = useNavigate()
  const checkGoogle = localStorage.getItem("google-current-user")
  const {profile,setProfile,clientId} = useContext(AuthContext)
  const auth = localStorage.getItem("auth")
  const logOut = () => {
      setProfile(null);
      localStorage.removeItem("auth")
      localStorage.removeItem("google-user")
      localStorage.removeItem("google-current-user")
      navigate('/login')
  };

  // check to handle login with google or normal login 
  const checkLoginWithGoogle = () => {
      if(checkGoogle)
      {
          return <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
      }else{
          return <Link to="/logout" className="mr-4 hover:underline md:mr-6">Logout</Link>
      }
  }

  const userProfile = () => {
      return (
        <>
   <Dropdown
  label={<Avatar alt="User settings" img={user?.imageUrl ? user?.imageUrl : "https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png"} rounded={true}/>}
  arrowIcon={false}
  inline={true}
>
  <Dropdown.Header>
    <span className="block text-sm">
      {user.name ? user?.name : user?.username}
    </span>
  </Dropdown.Header>
  <Dropdown.Item>
    <span className="block truncate text-sm font-medium">
    {user?.email ? user?.email : user?.email}
    </span>
  </Dropdown.Item>
  <Dropdown.Divider />
  <Dropdown.Item>
    <Link to="/profile" className="block truncate text-sm font-medium">
      profile
    </Link>
  </Dropdown.Item>
  <Dropdown.Divider />
  <Dropdown.Item>
  {
  auth && checkLoginWithGoogle()
  }
  
  </Dropdown.Item>
</Dropdown>
        </>
      )
  }
  return (
    <>
    <div className="p-5 pb-0 flex flex-wrap sm:justify-between justify-center items-center">
      <div className='flex justify-between items-center space-x-5 w-screen'>
      <Link to="/">
      <p className="text-2xl bg-blue-500 font-bold text-white py-1 px-2 rounded dark:bg-gray-50 dark:text-gray-900">
          JafEngine 🔎
        </p>
      </Link>

      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <Link to="/about" className="mr-4 hover:underline md:mr-6 ">About</Link>
        </li>
        <li>
            {auth ? ""
             : <Link to="/login" className="mr-4 hover:underline md:mr-6">Sign in</Link>} 
        </li>
        <li>
            <Link to="/contact" className="hover:underline">Contact</Link>
        </li>
    </ul>

        {
           auth && userProfile()
        }
      <button type="button" onClick={() => setDarkTheme(!darkTheme)} className="text-xl dark:bg-gray-50 dark:text-gray-900 bg-white border rounded-full px-2 py-1 hover:shadow-lg">{darkTheme ? '💡 Light' : '🌙 Dark'}</button>
      </div>
      {/* <Search /> */}
    </div>
    {
      // <p className='text-black'>{JSON.parse(localStorage.getItem("currentuser"))}</p> 
    }
    </>
  )
}
