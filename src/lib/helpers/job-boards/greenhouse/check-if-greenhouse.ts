const greenhouseURls = ['https://boards.greenhouse.io', 'https://job-boards.greenhouse.io/']

export default function checkIfGreenhouse() {
    if (greenhouseURls.some((url) => document.URL.includes(url))) {
        return true
    }

    // Check for a specific form ID used by Greenhouse
    const applicationForm = document.getElementById('application_form') as HTMLFormElement

    // Check for a specific URL in the form's action attribute, common in Greenhouse forms
    const isGreenhouseURL = applicationForm && applicationForm.action?.includes('greenhouse.io')

    // Check for a specific data attribute that Greenhouse uses
    const hasGreenhouseDataAttribute = document.querySelector('[data-email-address-validator-url]') !== null

    // Return true if all conditions meet; otherwise, false
    return !!applicationForm && isGreenhouseURL && hasGreenhouseDataAttribute
}
