import Education from '../../../../lib/types/education/education'
import Experience from '../../../../lib/types/experience/experience'
import Portfolio from '../../../../lib/types/portfolio/portfolio'
import { User } from '../../../../lib/types/user'

export default async function applyWithGreenhouse() {
    const applicationForm = document.getElementById('application_form') as HTMLFormElement

    const { currentPortfolio, ...data } = (await chrome.storage.sync.get([
        'experiences',
        'educations',
        'portfolios',
        'currentPortfolio',
        'user'
    ])) as {
        experiences: Experience[]
        educations: Education[]
        portfolios: Portfolio[]
        currentPortfolio: Portfolio
        user: User
    }

    console.log({ data })

    const firstNameInput = applicationForm.querySelector('#first_name') as HTMLInputElement
    firstNameInput.value = currentPortfolio.user.firstName

    const lastNameInput = applicationForm.querySelector('#last_name') as HTMLInputElement
    lastNameInput.value = currentPortfolio.user.lastName

    const emailInput = applicationForm.querySelector('#email') as HTMLInputElement
    emailInput.value = currentPortfolio.email

    const phoneInput = applicationForm.querySelector('#phone') as HTMLInputElement
    if (currentPortfolio.phone) {
        phoneInput.value = currentPortfolio.phone
    }
}
