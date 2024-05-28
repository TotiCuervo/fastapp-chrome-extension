import checkIfPageIsJobApplication from './check-if-page-is-job-application'
import addInputFloater from './helpers/job-boards/floaters/helpers/add-input-floater'

function init() {
    if (!checkIfPageIsJobApplication()) {
        return
    }
    const inputs = document.querySelectorAll('input, textarea')
    inputs.forEach((input) => {
        input.addEventListener('focus', handleFocus)
    })

    function handleFocus(event: Event) {
        addInputFloater(event.target)
    }
}

export default function suggestAnswersIfInputFocused() {
    window.addEventListener('load', init, false)
}
