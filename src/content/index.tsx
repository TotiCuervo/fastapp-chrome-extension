import addApplyNowButtonToForm from './add-apply-now-button-to-form'
import checkIfPageIsJobApplication from './check-if-page-is-job-application'
async function init() {
    const storage = await chrome.storage.sync.get(['educations', 'experiences'])
}

window.addEventListener('load', init, false)

// checkIfPageIsJobApplication()
addApplyNowButtonToForm()
