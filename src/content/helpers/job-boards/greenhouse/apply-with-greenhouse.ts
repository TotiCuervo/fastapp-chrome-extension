export default async function applyWithGreenhouse() {
    const applicationForm = document.getElementById('application_form') as HTMLFormElement
    const inputTags = applicationForm.querySelectorAll('input')
    const data = await chrome.storage.sync.get(['experiences', 'educations', 'portfolios', 'currentPortfolio'])
    console.log({ data })
    // Now you can work with the input tags
}
