import checkIfPageIsJobApplication from '../../../../../content/check-if-page-is-job-application'
import Floater from '../../../../../components/banner/floater'
import injectAfterBody from '../../../inject/inject-after-body'

export default function addFastappFloater() {
    const floater = document.getElementById('fastapp-floater')

    const check = checkIfPageIsJobApplication()

    if (floater && !check) {
        floater.remove()
    }

    if (floater || !check) {
        return
    }

    injectAfterBody({
        element: <Floater />,
        id: 'fastapp-floater'
    })
}
