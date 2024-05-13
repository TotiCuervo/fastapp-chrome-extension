import Floater from '../../../components/banner/floater'
import injectElement from '../inject-element'

export default function addFastappFloater() {
    const body = document.body

    injectElement({
        injectAfter: body,
        element: <Floater />
    })
}
