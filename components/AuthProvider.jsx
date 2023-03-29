import React, { useEffect, useState } from 'react'

function useAuth() {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [initializing, setInitializing] = useState(true)

    if(typeof localStorage === 'undefined'){
        return { 
            token: null, 
            user: null, 
            initializing: true 
        }
    }
    useEffect( () => {
        const t = localStorage.getItem('token')
        setToken(token)
        setInitializing(false)
    }, [])
  return (
    {
        token,
        user,
        initializing
    }
  )
}

export default useAuth