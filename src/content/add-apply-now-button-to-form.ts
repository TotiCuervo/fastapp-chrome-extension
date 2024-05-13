import checkIfGreenhouse from './helpers/job-boards/greenhouse/check-if-greenhouse'
import addApplyButtonToGreenhouse from './helpers/job-boards/greenhouse/add-apply-button-to-greenhouse'
import addFastappFloater from './helpers/job-boards/add-fastapp-floater'

const options = [
    {
        checker: checkIfGreenhouse,
        action: addApplyButtonToGreenhouse
    }
    // {
    //     checker: checkIfGreenhouse,
    //     action: addFastappFloater
    // }
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
