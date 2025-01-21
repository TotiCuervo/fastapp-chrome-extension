import ApplyWithFastAppBanner from '../../../../components/banner/apply-with-fastapp-banner'
import injectBeforeElement from '../../inject/inject-before-element'
import applyWithGreenhouse from './apply-with-greenhouse'

export default function addApplyButtonToGreenhouse() {
    const injectBefore = document.getElementsByClassName('application--header')[0]
    const injectAfter = document.getElementsByClassName('application--form')[0]

    injectBeforeElement({
        injectAfter,
        injectBefore,
        element: <ApplyWithFastAppBanner onClick={applyWithGreenhouse} />
    })
}
