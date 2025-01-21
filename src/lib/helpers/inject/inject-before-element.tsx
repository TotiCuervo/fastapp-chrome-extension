import ReactDOM from 'react-dom'
import injectElement from './inject-element'

interface InjectElementProps {
    injectAfter: HTMLElement | Element | null
    injectBefore?: HTMLElement | Element | null
    element: JSX.Element
}

export default function injectBeforeElement({ injectAfter, injectBefore, element }: InjectElementProps) {
    if (injectBefore && injectAfter) {
        // Create a new div element to act as a container for your React component
        const buttonContainer = document.createElement('div')

        if (injectBefore) {
            // Insert the new container right after the content div
            injectAfter.parentNode?.insertBefore(buttonContainer, injectBefore)
        }

        injectElement({
            container: buttonContainer,
            element
        })
    } else {
        console.log('Required elements not found.')
    }
}
