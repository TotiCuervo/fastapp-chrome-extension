import checkIfGreenhouse from '../lib/helpers/job-boards/greenhouse/check-if-greenhouse'
import addApplyButtonToGreenhouse from '../lib/helpers/job-boards/greenhouse/add-apply-button-to-greenhouse'
import addFastappFloater from '../lib/helpers/job-boards/floaters/helpers/add-fastapp-floater'
import checkIfPageIsJobApplication from './check-if-page-is-job-application'

const options = [
    {
        checker: checkIfGreenhouse,
        action: addApplyButtonToGreenhouse
    },
    {
        checker: checkIfPageIsJobApplication,
        action: addFastappFloater
    }
]

async function init() {
    const executedActions = new Set() // To keep track of executed actions

    const observer = new MutationObserver(() => {
        evaluateOptions(observer)
    })

    const evaluateOptions = (observer: any) => {
        options.forEach((option) => {
            if (!executedActions.has(option.action) && option.checker()) {
                option.action()
                executedActions.add(option.action)
                // Continue to check other options even if one is true, to ensure all necessary actions are taken.
            }
        })

        // Disconnect observer if all actions are executed
        if (executedActions.size === options.length) {
            observer.disconnect()
        }
    }

    evaluateOptions(observer)

    observer.observe(document.body, { childList: true, subtree: true })
}

export default function addApplyNowButtonToForm() {
    window.addEventListener('load', init, false)
}
