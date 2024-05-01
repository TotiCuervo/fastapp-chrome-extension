import client from '../../client'

export interface LoginParams {
    email: string
    password: string
}

export default function login({ email, password }: LoginParams) {
    return client.post('/login/', { email, password })
}
