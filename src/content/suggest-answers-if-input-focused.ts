import checkIfPageIsJobApplication from './check-if-page-is-job-application'
import addInputFloaterOptions from '../lib/helpers/job-boards/floaters/helpers/input-floater-options/add-input-floater-options'

function init() {
    if (!checkIfPageIsJobApplication()) {
        return
    }

    const inputs = document.querySelectorAll('input[type="text"], textarea')

    inputs.forEach((input) => {
        input.addEventListener('focus', handleFocus)
        input.addEventListener('click', handleFocus)
    })

    function handleFocus(event: Event) {
        addInputFloaterOptions(event.target)
    }
}

export default function suggestAnswersIfInputFocused() {
    window.addEventListener('load', init, false)
}
