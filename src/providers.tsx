import React from 'react'
import { UserProvider } from './lib/context/UserContext'
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface IProps {
    children: React.ReactNode
}

export default function Providers({ children }: IProps) {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>{children}</UserProvider>
        </QueryClientProvider>
    )
}
