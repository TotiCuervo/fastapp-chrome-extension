import ApplyWithFastAppBanner from '../../../../components/banner/apply-with-fastapp-banner'
import injectElement from '../../inject-element'

export default function addApplyButtonToGreenhouse() {
    const contentDiv = document.getElementById('content')
    const applicationDiv = document.getElementById('application')

    injectElement({
        injectAfter: contentDiv,
        injectBefore: applicationDiv,
        element: <ApplyWithFastAppBanner />
    })
}
