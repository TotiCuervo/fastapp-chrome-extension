import PromptOption from './promptOption'

export default interface PromptField {
    displayName: string
    inputName: string
    inputType: 'text' | 'textarea' | 'select'
    required: boolean
    options?: PromptOption[]
}
