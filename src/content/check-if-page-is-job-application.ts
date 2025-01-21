import JobApplicationKeywords from '../lib/consts/job-application-keywords'
import InputLabelKeywords from '../lib/consts/input-label-keywords'
import checkIfPageIsOnIgnoreList from './check-if-page-is-on-ignore-list'

export default function checkIfPageIsJobApplication() {
    let debounceTimer: ReturnType<typeof setTimeout>
    let isJobApplicationPage = false // Track state to avoid redundant checks

    function evaluatePage() {
        if (isJobApplicationPage) return true // Skip evaluation if already identified

        const bodyText = document.body.innerText.toLowerCase()

        if (checkIfPageIsOnIgnoreList()) {
            return false
        }

        const hasApplicationKeywords = JobApplicationKeywords.some((keyword) => bodyText.includes(keyword))
        const hasForm = document.querySelector('form') !== null
        const hasIframe = document.querySelector('iframe') !== null

        const formElements = Array.from(document.querySelectorAll('label'))
        const hasFormLabels = InputLabelKeywords.some((label) =>
            formElements.some((element) => element.textContent?.toLowerCase().includes(label))
        )

        const required = hasForm || hasIframe
        const optional = hasApplicationKeywords || hasFormLabels

        const isJobApp = required && optional

        if (isJobApp) {
            isJobApplicationPage = true // Set state to true
            return true
        }

        return false
    }

    // Perform initial evaluation
    if (evaluatePage()) {
        return true
    }

    // Set up DOM monitoring for dynamic content changes
    const observer = new MutationObserver(() => {
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
            if (evaluatePage()) {
                observer.disconnect() // Stop observing once identified
            }
        }, 100) // Debounce interval
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return false
}
