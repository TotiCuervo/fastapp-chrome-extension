import addApplyNowButtonToForm from './add-apply-now-button-to-form'
import suggestAnswersIfInputFocused from './suggest-answers-if-input-focused'
import handleSaveJob from './handle-save-job'
import addFastappFloater from '../lib/helpers/job-boards/floaters/helpers/add-fastapp-floater'

if (window.self === window.top) {
    // top level page
    addApplyNowButtonToForm()
    addFastappFloater()
    suggestAnswersIfInputFocused()
    handleSaveJob()
} else {
    // iframe
    suggestAnswersIfInputFocused()
    addApplyNowButtonToForm()
    handleSaveJob()
}
