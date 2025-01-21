import addFastappFloater from '../lib/helpers/job-boards/floaters/helpers/add-fastapp-floater'
import checkIfPageIsJobApplication from './check-if-page-is-job-application'
import observeChanges from '../lib/helpers/observers/observe-changes'

const options = [
    {
        checker: checkIfPageIsJobApplication,
        action: addFastappFloater
    }
]

async function init() {
    observeChanges(options)
}

export default function addApplyNowButtonToForm() {
    window.addEventListener('load', init, false)
}
