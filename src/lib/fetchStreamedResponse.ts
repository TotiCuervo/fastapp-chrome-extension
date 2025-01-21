import constants from '../constants'

async function fetchStreamedResponse(
    endpoint: string,
    payload: Record<string, any>,
    setLoading: (loading: boolean) => void,
    onChunk: (chunk: string) => void
) {
    // Set loading to true
    setLoading(true)

    // Get the token from chrome storage
    const { token } = await chrome.storage.sync.get(['token'])

    // Prepare the request options
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    // Perform the fetch request
    const response = await fetch(`${constants.API_URL}/api${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    })

    // Check if the response is a stream
    if (!response.body) {
        setLoading(false)
        throw new Error('Readable stream not supported in the response')
    }

    // Read and process the response stream
    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')

    while (true) {
        const { done, value } = await reader.read()
        if (done) {
            setLoading(false)
            break
        }
        const chunk = decoder.decode(value)
        onChunk(chunk) // Pass the chunk to the callback
    }
}

export default fetchStreamedResponse
