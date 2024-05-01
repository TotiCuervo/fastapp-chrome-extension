'use client'
import React, { createContext, useEffect, useState } from 'react'
import { User } from '../types/user'
import login, { LoginParams } from '../endpoints/auth/login'

// Define the shape of the context value
interface UserContextValue {
    user: User | null
    setUser: (user: User | null) => void
    loading: boolean
    login: (props: LoginParams) => void
}

// Create the initial context value
const initialUserContextValue: UserContextValue = {
    user: null,
    setUser: () => {},
    loading: true,
    login: () => {},
}

// Create the context
export const UserContext = createContext<UserContextValue>(initialUserContextValue)

// Create the context provider function
export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     setLoading(true)
    //     if (!session || !session.user) {
    //         setUser(null)
    //         return
    //     }
    //     setUser(session.user)
    // }, [session])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [user])

    async function handleLogin(props: LoginParams) {
        const res = await login(props)
        console.log({ res })
    }

    return (
        <UserContext.Provider value={{ user, setUser, loading, login: handleLogin }}>{children}</UserContext.Provider>
    )
}

// Create the useUser hook
export function useUserContext() {
    return React.useContext(UserContext)
}
