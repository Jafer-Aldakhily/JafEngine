import { createContext, useState } from "react";

export const AuthContext = createContext()

 // for login with google, as I readed client_id is the important key
 const clientId = "893683379033-pgbphdcqnn8n12bfel9orom8gphh8hhv.apps.googleusercontent.com"
 const secretId = "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"

export default function AuthContextProvider({children})
{

    const [auth,setAuth] = useState(false)
    const [userid,setUserId] = useState(null)
    const [username,setUserName] = useState('')
    const [profile,setProfile]= useState([])

    return (
        <AuthContext.Provider value={{auth,setAuth,userid,setUserId,username
        ,setUserName,profile,setProfile,clientId}}>
            {children}
        </AuthContext.Provider>
    )
}