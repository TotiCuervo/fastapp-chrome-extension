import PromptField from './promptField'

export default interface Prompt {
    id: number
    name: string
    description: string
    prompt: string
    fields: PromptField[]
}
