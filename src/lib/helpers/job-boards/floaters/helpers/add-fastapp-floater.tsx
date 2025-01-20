import checkIfPageIsJobApplication from '../../../../../content/check-if-page-is-job-application'
import Floater from '../../../../../components/banner/floater'
import injectAfterBody from '../../../inject/inject-after-body'

export default function addFastappFloater() {
    const floater = document.getElementById('fastapp-floater')

    if (floater) {
        floater.remove()
    }

    if (!checkIfPageIsJobApplication()) return

    injectAfterBody({
        element: <Floater />
    })
}
