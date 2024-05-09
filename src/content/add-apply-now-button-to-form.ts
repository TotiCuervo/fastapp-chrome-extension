import checkIfGreenhouse from './helpers/job-boards/greenhouse/check-if-greenhouse'
import addApplyButtonToGreenhouse from './helpers/job-boards/greenhouse/add-apply-button-to-greenhouse'

const options = [
    {
        checker: checkIfGreenhouse,
        action: addApplyButtonToGreenhouse,
    },
]

async function init() {
    options.forEach(async (option) => {
        if (option.checker()) {
            option.action()
        }
    })
}

export default function addApplyNowButtonToForm() {
    window.addEventListener('load', init, false)
}
