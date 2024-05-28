import checkIfPageIsJobApplication from './check-if-page-is-job-application'
import addInputFloater from './helpers/job-boards/floaters/helpers/add-input-floater'
import removeInputFloater from './helpers/job-boards/floaters/helpers/remove-input-floater'

function init() {
    if (!checkIfPageIsJobApplication()) {
        console.log('Not a job application page')
        return
    }
    const inputs = document.querySelectorAll('input, textarea')
    console.log({ inputs })
    inputs.forEach((input) => {
        input.addEventListener('focus', handleFocus)
        // input.addEventListener('blur', handleBlur)
    })

    function handleFocus(event: Event) {
        window.addEventListener('scroll', handleBlur)
        addInputFloater(event.target)
    }

    function handleBlur(event: Event) {
        removeInputFloater()
    }
}

export default function suggestAnswersIfInputFocused() {
    window.addEventListener('load', init, false)
}
