import checkIfPageIsJobApplication from './check-if-page-is-job-application'
import addInputFloaterOptions from '../lib/helpers/job-boards/floaters/helpers/input-floater-options/add-input-floater-options'

async function init(): Promise<void> {
    if (!checkIfPageIsJobApplication()) {
        return
    }

    const handleFocus = (event: Event): void => {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement
        if (target) {
            addInputFloaterOptions(target)
        }
    }

    const addListenersToInputs = (doc: Document): void => {
        const inputs = doc.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input[type="text"], textarea')
        inputs.forEach((input) => {
            input.addEventListener('focus', handleFocus)
            input.addEventListener('click', handleFocus)
        })
    }

    const observeDOMChanges = (doc: Document): void => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    const addedNodes = Array.from(mutation.addedNodes)
                    addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const newInputs = (node as Element).querySelectorAll<
                                HTMLInputElement | HTMLTextAreaElement
                            >('input[type="text"], textarea')
                            newInputs.forEach((input) => {
                                input.addEventListener('focus', handleFocus)
                                input.addEventListener('click', handleFocus)
                            })
                        }
                    })
                }
            })
        })
        observer.observe(doc.body, { childList: true, subtree: true })
        addListenersToInputs(doc)
    }

    addListenersToInputs(document)
    observeDOMChanges(document)
}

export default function suggestAnswersIfInputFocused(): void {
    window.addEventListener('load', init, false)
}
