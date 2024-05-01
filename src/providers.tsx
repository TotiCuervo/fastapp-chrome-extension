import React from 'react'
import { UserProvider } from './lib/context/UserContext'


interface IProps {
  children: React.ReactNode
}

export default function Providers({ children }: IProps) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  )
}
