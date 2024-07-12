import ReactDOM from 'react-dom'
import injectElement from './inject-element'

interface InjectElementProps {
    injectAfter: HTMLElement | ChildNode | null
    element: JSX.Element
}

export default function injectAfterElement({ injectAfter, element }: InjectElementProps) {
    if (injectAfter) {
        // Create a new div element to act as a container for your React component
        const buttonContainer = document.createElement('div')

        // Insert the new container right after the content div
        injectAfter.insertBefore(buttonContainer, injectAfter)

        injectElement({
            container: buttonContainer,
            element,
        })
    } else {
        console.log('Required elements not found.')
    }
}
