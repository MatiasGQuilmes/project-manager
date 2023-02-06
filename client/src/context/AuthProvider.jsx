import { trusted } from 'mongoose'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { clientAxios } from '../config/clientAxios'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)
 

    useEffect(()=>{
        
        const authUser = async () => {
            const token = sessionStorage.getItem('token')

            if(!token){
                setLoading(false)
                return null
            }

            const config = {
                headers : {
                    "Content-type" : "application/json",
                    Authorization : token
                }
            }

            try {
                const {data} = await clientAxios.get('/users/profile', config);

                setAuth(data.user)
                

            } catch (error) {
                console.error(error.response?.data);
                sessionStorage.removeItem('token')
            } finally {
                setLoading(false)
            }
        }

        authUser()
    }, [])

  return (
        <AuthContext.Provider
            value={
                {
                    auth, 
                    setAuth,
                    loading
                }
            }
        >
            {children}

        </AuthContext.Provider>
  )
}

export default AuthContext