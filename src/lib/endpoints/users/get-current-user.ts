import client from '../../client'

export interface LoginParams {
    email: string
    password: string
}

export default function getCurrentUser() {
    return client.get('/users/me/')
}
