import checkIfGreenhouse from '../lib/helpers/job-boards/greenhouse/check-if-greenhouse'
import addApplyButtonToGreenhouse from '../lib/helpers/job-boards/greenhouse/add-apply-button-to-greenhouse'
import observeChanges from '../lib/helpers/observers/observe-changes'

const options = [
    {
        checker: checkIfGreenhouse,
        action: addApplyButtonToGreenhouse
    }
]

async function init() {
    observeChanges(options)
}

export default function addApplyNowButtonToForm() {
    window.addEventListener('load', init, false)
}
