import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import LoginForm from './components/login-form'

export default function Page() {
    function signup() {
        chrome.tabs.create({
            url: 'http://localhost:3000/login',
        })
    }

    return (
        <div className="flex grid grow flex-col items-center justify-center p-10">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Welcome back</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoginForm />
                    </CardContent>
                    <CardFooter>
                        <p className="text-muted-foreground px-8 text-center text-sm">
                            By clicking continue, you agree to our{' '}
                            <a
                                className="hover:text-primary underline underline-offset-4"
                                href="/terms"
                            >
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a
                                className="hover:text-primary underline underline-offset-4"
                                href="/privacy"
                            >
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </CardFooter>
                </Card>
                <div
                    onClick={signup}
                    className="text-muted-foreground w-full cursor-pointer text-center text-lg hover:underline"
                >
                    Don't have an account?{' '}
                    <div className="text-default font-semibold transition dark:text-gray-300 dark:hover:text-gray-100">
                        Sign up
                    </div>
                </div>
            </div>
        </div>
    )
}