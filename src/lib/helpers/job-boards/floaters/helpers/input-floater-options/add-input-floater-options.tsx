import injectAfterBody from '../../../../inject/inject-after-body'
import InputFloaterOptions from '../../input-floater-options'

export default function addInputFloaterOptions(eventTarget: EventTarget | null) {
    if (!eventTarget) return

    const input = eventTarget as HTMLInputElement

    injectAfterBody({
        element: <InputFloaterOptions input={input} />,
        id: 'fastapp-floater-options'
    })
}
