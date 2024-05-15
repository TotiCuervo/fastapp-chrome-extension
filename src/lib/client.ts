import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import constants from '../constants'
// import { getSession, signOut } from 'next-auth/react'
// import { redirect } from 'next/navigation'

let redirectCancels: (() => void)[] = []

type RequestConfigWithRedirect = AxiosRequestConfig & {
    redirectOn401: boolean
}

const createClient = () =>
    axios.create({
        baseURL: `${constants.API_URL}/api`,
        headers: { 'Content-Type': 'application/json' },
        responseType: 'json',
    })

const client = createClient()

client.interceptors.request.use(async (config) => {
    const redirectConfig = config as RequestConfigWithRedirect

    redirectCancels.push(() => {
        redirectConfig.redirectOn401 = false
    })

    redirectConfig.redirectOn401 = true
    const token = await chrome.storage.sync.get(['token'])
    if (token) {
        config.headers!.Authorization = `Bearer ${token.token}`
    }

    return config
})

client.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 401) {
                const redirectConfig = error.config as RequestConfigWithRedirect

                if (redirectConfig.redirectOn401) {
                    redirectCancels.forEach((cancel) => cancel())
                    redirectCancels.splice(0, redirectCancels.length)
                    // signOut({ callbackUrl: '/login/' })
                }
            }

            if (error.response !== undefined) {
                const headers = (error.response as AxiosResponse)?.headers

                const contentType = (headers['Content-Type'] ?? headers['content-type']) as string | undefined
                const isJsonBody = contentType?.includes('application/json')
                const responseBodyMessage = isJsonBody ? `, response was ${JSON.stringify(error.response.data)}` : ''
                const errorMessage = `${error.config?.method?.toUpperCase()} Request to ${error.config?.baseURL}${
                    error.config?.url
                } failed with status ${error.response.status}${responseBodyMessage}`
            }
        }

        return Promise.reject(error)
    }
)

export default client
