import { useEffect, useState } from 'react'
import { User } from '../types/user'
import AnswerSuggestion from '../types/answer-suggestion/answer-suggestion'
import useUserInfo from './use-user-info'

export default function useGetAnswers(input: HTMLInputElement) {
    const [answerSuggestions, setAnswerSuggestions] = useState<AnswerSuggestion[]>([])
    const { loaded, ...info } = useUserInfo()

    useEffect(() => {
        if (!loaded) return

        const suggestions: AnswerSuggestion[] = []

        // Helper function to add suggestion if not already added
        const addSuggestion = (label: string, value: string) => {
            if (!suggestions.some((suggestion) => suggestion.value === value)) {
                suggestions.push({ label, value })
            }
        }

        // Helper function to clean asterisks from values
        const cleanValue = (value: string) => value.replace(/\*/g, '').trim()

        // Check sibling div for potential labels
        const checkSiblingDivs = (input: HTMLInputElement) => {
            const siblingDiv = input.nextElementSibling || input.previousElementSibling
            if (siblingDiv && siblingDiv.tagName.toLowerCase() === 'div' && siblingDiv.textContent?.trim() !== '') {
                return cleanValue(siblingDiv.textContent?.trim().toLowerCase() || '')
            }
            return null
        }

        // Determine if any value loosely matches a label
        const looselyMatches = (value: string, label: string) => {
            const regex = new RegExp(label.split(' ').join('|'), 'i')
            return regex.test(value)
        }

        // Determine the type of information needed
        const determineInfoType = (input: HTMLInputElement) => {
            const placeholder = cleanValue(input.getAttribute('placeholder')?.toLowerCase() || '')
            const id = cleanValue(input.getAttribute('id')?.toLowerCase() || '')
            const className = cleanValue(input.getAttribute('class')?.toLowerCase() || '')
            const name = cleanValue(input.getAttribute('name')?.toLowerCase() || '')
            const siblingText = checkSiblingDivs(input) || ''

            // Define possible labels and corresponding user info fields
            const infoMappings: { [key: string]: keyof User } = {
                'first name': 'firstName',
                'last name': 'lastName',
                email: 'email'
            }

            const possibleValues = [placeholder, id, className, name, siblingText].filter(Boolean) as string[]
            for (const value of possibleValues) {
                for (const [label, field] of Object.entries(infoMappings)) {
                    if (looselyMatches(value, label)) {
                        const fieldValue = info.user?.[field]
                        if (fieldValue && typeof fieldValue === 'string') {
                            addSuggestion(label, fieldValue)
                        }
                    }
                }
            }
        }

        if (input) {
            determineInfoType(input)
        }

        setAnswerSuggestions(suggestions)
    }, [loaded])

    return {
        suggestions: answerSuggestions
    }
}
