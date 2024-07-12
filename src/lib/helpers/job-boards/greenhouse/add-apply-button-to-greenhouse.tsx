import ApplyWithFastAppBanner from '../../../../components/banner/apply-with-fastapp-banner'
import injectBeforeElement from '../../inject/inject-before-element'
import applyWithGreenhouse from './apply-with-greenhouse'

export default function addApplyButtonToGreenhouse() {
    const contentDiv = document.getElementById('content')
    const applicationDiv = document.getElementById('application')

    injectBeforeElement({
        injectAfter: contentDiv,
        injectBefore: applicationDiv,
        element: <ApplyWithFastAppBanner onClick={applyWithGreenhouse} />
    })
}
