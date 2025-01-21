import injectAfterBody from '../../../inject/inject-after-body'
import InputFloater from '../input-floater'

export default function addInputFloater(eventTarget: EventTarget | null) {
    if (!eventTarget) return

    const input = eventTarget as HTMLInputElement

    injectAfterBody({
        element: <InputFloater input={input} />,
        id: 'fastapp-input-floater'
    })
}
