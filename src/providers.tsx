import React from 'react'
import { UserProvider } from './lib/context/UserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

interface IProps {
    children: React.ReactNode
}

export default function Providers({ children }: IProps) {
    const queryClient = new QueryClient()

    return (
        // @ts-ignore
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <QueryClientProvider client={queryClient}>
                <UserProvider>{children}</UserProvider>
            </QueryClientProvider>
        </NextThemesProvider>
    )
}
