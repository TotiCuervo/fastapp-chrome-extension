'use client'
import React, { createContext, useEffect, useState } from 'react'
import { User } from '../types/user'
import login, { LoginParams } from '../endpoints/auth/login'
import getCurrentUser from '../endpoints/users/get-current-user'
import useUserEducationQuery from '../query/education/useUserEducationQuery'
import useUserExperienceQuery from '../query/experience/useUserExperienceQuery'
import Education from '../types/education/education'
import Experience from '../types/experience/experience'
import usePortfoliosQuery from '../query/portfolios/usePortfoliosQuery'

// Define the shape of the context value
interface UserContextValue {
    user: User | null
    setUser: (user: User | null) => void
    loading: boolean
    login: (props: LoginParams) => void
    educations: Education[]
    experiences: Experience[]
}

// Create the initial context value
const initialUserContextValue: UserContextValue = {
    user: null,
    setUser: () => {},
    loading: true,
    login: () => {},
    educations: [],
    experiences: []
}

// Create the context
export const UserContext = createContext<UserContextValue>(initialUserContextValue)

// Create the context provider function
export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const { data: educations = [] } = useUserEducationQuery({ userId: user?.id })
    const { data: experiences = [] } = useUserExperienceQuery({ userId: user?.id })
    const { data: portfolios = [] } = usePortfoliosQuery()

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        async function setData() {
            await chrome.storage.sync.set({ educations })
        }

        setData()
    }, [educations])

    useEffect(() => {
        async function setData() {
            await chrome.storage.sync.set({ experiences })
        }

        setData()
    }, [experiences])

    useEffect(() => {
        async function setData() {
            await chrome.storage.sync.set({ portfolios })
            await chrome.storage.sync.set({ currentPortfolio: portfolios[0] })
        }

        setData()
    }, [portfolios])

    async function getUser() {
        const storage = await chrome.storage.sync.get(['token'])
        const { token } = storage

        setLoading(true)

        if (!token) {
            setLoading(false)
            return
        }

        try {
            const res = await getCurrentUser()
            const { data } = res.data
            await chrome.storage.sync.set({ user: data })
            setUser(data)
        } finally {
            setLoading(false)
        }
    }

    async function handleLogin(props: LoginParams) {
        const { data } = await login(props)

        const { token, user } = data

        await chrome.storage.sync.set({ token })
        await chrome.storage.sync.set({ user })
        setUser(user)
    }

    return (
        <UserContext.Provider value={{ user, setUser, loading, login: handleLogin, experiences, educations }}>
            {children}
        </UserContext.Provider>
    )
}

// Create the useUser hook
export function useUserContext() {
    return React.useContext(UserContext)
}
