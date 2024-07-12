import injectElement from './inject-element'

interface InjectElementProps {
    element: JSX.Element
    id?: string
}

export default function injectAfterBody({ element, id }: InjectElementProps) {
    const container = document.createElement('div')
    if (id) container.id = id

    document.documentElement.insertBefore(container, document.body.nextSibling)

    injectElement({
        container: container,
        element,
        id
    })
}
