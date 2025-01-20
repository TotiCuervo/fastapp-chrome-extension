June 10th, 2023
I am currently working on how to supply text inputs with answers based off a users profile and portfolio. Right now I am running into the issue of having to figure out what to suggest based off the input. I am realizing that I am attaching the options component to the input when there is a chance that we cannot tell straight off the input what to suggest. There could be a label that is not caught by only looking at the input. Therefore, I am currently looking into how to refactor what I have to:

1. Check to see if there is a field class div
2. if where the input lives, there is a parent div (that may have a field)
3. After that is done, I need to start thinking about making a function that works to see if we know what question we are supposed to be answering for a field (ex: first name)
4. If it isn't tellable by the type, then maybe we need to look for a field, etc etc
5. maybe even look at placeholders
6. and then from there we need to be able to say "okay now that we have guessed what this is, lets give some suggestions
   July 8th 2023
   In input-floater-options I am working on being able to focus on an input multiple times and clicking on the options and having it insert the value. Right now it only does it on the first focus. Something to do with the on blur

July 10th, 2023
I have figured out what it is. The issue in input-floater-options is because of the sequence of inputing, onbluring, and removing the on blur.

The on blur is not getting removed BEFORE you are going and doing the removing of the input. Make sure that the on blurs get removed beforehand.

I am partially doing this by having a useEffect on value, removing the onblur, then removing it

The question now is how to add an on blur and remove it when dealing with hover

July 14th, 2023
I am working on certain pages not detecting.

Specifically https://consensys.io/open-roles/5853947?gh_jid=5853947 is a good example

check-if-page-is-job-application.ts
import JobApplicationKeywords from '../lib/consts/job-application-keywords'
import InputLabelKeywords from '../lib/consts/input-label-keywords'
import checkIfPageIsOnIgnoreList from './check-if-page-is-on-ignore-list'

export default function checkIfPageIsJobApplication() {
// Get all text content on the page and convert it to lower case for case-insensitive matching
const bodyText = document.body.innerText.toLowerCase()

    if (checkIfPageIsOnIgnoreList()) {
        return false
    }

    // Check for general keywords indicating a job application
    const hasApplicationKeywords = JobApplicationKeywords.some((keyword) => bodyText.includes(keyword))

    const hasForm = document.querySelector('form') !== null

    // Check for specific form labels that are commonly used in job applications
    const formElements = Array.from(document.querySelectorAll('label'))
    const hasFormLabels = InputLabelKeywords.some((label) =>
        formElements.some((element) => element.textContent?.toLowerCase().includes(label))
    )


    const required = hasForm
    const optional = hasApplicationKeywords || hasFormLabels
    return required && optional

}

and

suggest-answers-if-input-focused.ts
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

    console.log({ inputs })

    function handleFocus(event: Event) {
        addInputFloaterOptions(event.target)
    }

}

export default function suggestAnswersIfInputFocused() {
window.addEventListener('load', init, false)
}

I have added some debounces that you can remove
