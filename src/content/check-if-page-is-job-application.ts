import JobApplicationKeywords from '../lib/consts/job-application-keywords'
import InputLabelKeywords from '../lib/consts/input-label-keywords'

export default function checkIfPageIsJobApplication() {
    // Get all text content on the page and convert it to lower case for case-insensitive matching
    const bodyText = document.body.innerText.toLowerCase()

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
