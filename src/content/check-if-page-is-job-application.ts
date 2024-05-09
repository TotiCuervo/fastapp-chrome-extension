import JobApplicationKeywords from '../lib/consts/job-application-keywords'
import InputLabelKeywords from '../lib/consts/input-label-keywords'
async function init() {
    // Get all text content on the page and convert it to lower case for case-insensitive matching
    const bodyText = document.body.innerText.toLowerCase()

    // Check for general keywords indicating a job application
    const hasApplicationKeywords = JobApplicationKeywords.some((keyword) => bodyText.includes(keyword))

    // Check for specific form labels that are commonly used in job applications
    const formElements = Array.from(document.querySelectorAll('label'))
    const hasFormLabels = InputLabelKeywords.some((label) =>
        formElements.some((element) => element.textContent?.toLowerCase().includes(label))
    )

    // Determine if the page is likely a job application page
    return hasApplicationKeywords || hasFormLabels
}

export default function checkIfPageIsJobApplication() {
    window.addEventListener('load', init, false)
}
