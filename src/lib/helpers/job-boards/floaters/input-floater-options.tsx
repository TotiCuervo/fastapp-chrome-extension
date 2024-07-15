import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import removeInputFloaterOptions from './helpers/input-floater-options/remove-input-floater-options'
import useGetAnswers from '../../../../lib/hooks/use-get-answers'

interface IProps {
    input: HTMLInputElement
}

interface State {
    show: boolean
    hovering: boolean
    active: boolean
}

export default function InputFloaterOptions({ input }: IProps) {
    const [state, setState] = useState<State>({
        show: false,
        hovering: false,
        active: true
    })

    const divRef = useRef<HTMLDivElement>(null)

    const { suggestions } = useGetAnswers(input)

    const inputRect = input.getBoundingClientRect()
    const { left, bottom, width } = inputRect

    const handleBlur = () => {
        const timer = setTimeout(() => {
            if (!state.hovering) {
                remove()
            } else {
            }
        }, 150)

        return () => {
            clearTimeout(timer)
        }
    }

    const handleScroll = () => {
        remove()
    }

    function remove() {
        input.removeEventListener('blur', handleBlur)
        window.removeEventListener('scroll', handleScroll)
        removeInputFloaterOptions()
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            chrome.storage.sync.get(['floaterActive'], (result) => {
                let active = true

                if (result.floaterActive !== undefined) {
                    active = result.floaterActive
                }
                setState((prevState) => ({
                    ...prevState,
                    active,
                    show: true
                }))
            })
        }, 1)

        input.addEventListener('blur', handleBlur)
        window.addEventListener('scroll', handleScroll)

        return () => {
            clearTimeout(timer)
            input.removeEventListener('blur', handleBlur)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [input])

    function inputSuggestion(event: React.MouseEvent<HTMLDivElement, MouseEvent>, suggestion: string) {
        event.preventDefault()
        event.stopPropagation()

        input.value = suggestion
        setState((prevState) => ({
            ...prevState,
            show: false,
            hovering: false
        }))
    }

    if (!state.show || !state.active) return null

    return (
        <div
            ref={divRef}
            onMouseEnter={() => {
                setState((prevState) => ({
                    ...prevState,
                    hovering: true
                }))
            }}
            onMouseLeave={() => {
                setState((prevState) => ({
                    ...prevState,
                    hovering: false
                }))
            }}
            style={{
                width,
                top: `${bottom}px`,
                left: `${left}px`,
                zIndex: 9999
            }}
            className={twMerge(`fixed z-50 rounded-lg border bg-black p-2 text-white shadow transition`)}
        >
            {suggestions.map((suggestion, index) => (
                <div
                    key={index}
                    className="cursor-pointer rounded-lg p-3 hover:bg-zinc-900"
                    onClick={(event) => inputSuggestion(event, suggestion.value)}
                >
                    {suggestion.value}
                </div>
            ))}
        </div>
    )
}
