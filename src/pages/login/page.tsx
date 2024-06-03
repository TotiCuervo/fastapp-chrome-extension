import { useUserContext } from '../../lib/context/UserContext'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import LoginForm from './components/login-form'
import { useNavigate } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import constants from '../../../src/constants'

export default function Page() {
    const { user, loading } = useUserContext()
    const navigate = useNavigate()

    function signup() {
        chrome.tabs.create({
            url: constants.SIGNUP_URL
        })
    }

    if (user) {
        navigate('/')
    }

    if (loading) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
            </div>
        )
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
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{' '}
                            <a className="underline underline-offset-4 hover:text-primary" href="/terms">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a className="underline underline-offset-4 hover:text-primary" href="/privacy">
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </CardFooter>
                </Card>
                <div
                    onClick={signup}
                    className="w-full cursor-pointer text-center text-lg text-muted-foreground hover:underline"
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
