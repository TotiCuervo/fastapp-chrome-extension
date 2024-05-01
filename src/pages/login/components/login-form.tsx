'use client'
import React, { useState } from 'react'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import Button from '../../../components/buttons/button'
import { Alert } from '../../../lib/types/alert'
import Alerter from '../../../components/alerts/alerter'
import { useUserContext } from '../../../lib/context/UserContext'

export default function LoginForm() {
    const { login } = useUserContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState<Alert>()
    // const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            await login({ email, password })
            // if (!response || !response.ok) {
            //     throw new Error('Invalid credentials')
            // }

            setAlert(undefined)

            // router.push(jsDashboardRoute())
        } catch (error) {
            setAlert({
                show: true,
                type: 'danger',
                message: 'Looks like something went wrong. Please try again.',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
                <Alerter alert={alert} />
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="email">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button
                    loading={loading}
                    loadingText="Logging in..."
                >
                    Login
                </Button>
            </div>
        </form>
    )
}
