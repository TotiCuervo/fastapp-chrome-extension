import Floater from '../../../components/banner/floater'
import injectAfterBody from '../inject/inject-after-body'
import injectAfterElement from '../inject/inject-after-element'
import injectElement from '../inject/inject-element'

export default function addFastappFloater() {
    injectAfterBody({
        element: <Floater />,
    })
}
