import client from '../../client'

export default async function getPrompts() {
    return client.get('/prompts')
}
