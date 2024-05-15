import React from 'react'
import { useUserContext } from '../lib/context/UserContext'

export default function Root() {
    const { user } = useUserContext()

    return <div className="h-full text-blue-500">User: {user === null ? 'null' : user.email}</div>
}
