import ReactDOM from 'react-dom'
import injectElement from './inject-element'

interface InjectElementProps {
    element: JSX.Element
}

export default function injectAfterBody({ element }: InjectElementProps) {
    const container = document.createElement('div')

    document.documentElement.insertBefore(container, document.body.nextSibling)

    injectElement({
        container: container,
        element,
    })
}
