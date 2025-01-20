async function init() {
    console.log('Extracting text...2')
    const text = await stripHtmlBodyContent()
    console.log({ text })
}

async function stripHtmlBodyContent(): Promise<string> {
    // Extract text from the main document
    let bodyText = document.body.innerText.replace(/\n+/g, ' ') // Replace newlines with spaces

    // Wait for all iframes to load
    const iframes = document.getElementsByTagName('iframe')
    await Promise.all(
        Array.from(iframes).map(
            (iframe) =>
                new Promise<void>((resolve) => {
                    iframe.addEventListener('load', () => resolve(), { once: true })
                    if (iframe.contentDocument?.readyState === 'complete') {
                        resolve() // If already loaded, resolve immediately
                    }
                })
        )
    )

    // Extract text from the loaded iframes
    const iframeTexts: Promise<string>[] = Array.from(iframes).map(async (iframe) => {
        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
            if (iframeDoc) {
                return iframeDoc.body.innerText.replace(/\n+/g, ' ') || '' // Replace newlines with spaces
            }
        } catch (e) {
            console.warn('Could not access iframe content', e)
        }
        return '' // Return empty string for inaccessible iframes
    })

    // Wait for all iframe text to be extracted
    const iframeTextResults = await Promise.all(iframeTexts)

    // Combine the body text and iframe texts
    bodyText += ' ' + iframeTextResults.join(' ')

    return bodyText
}

export default function handleSaveJob(): void {
    console.log('handleSaveJob')
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        // If the document is already loaded, run init immediately
        init()
    } else {
        // Otherwise, wait for DOMContentLoaded
        window.addEventListener('DOMContentLoaded', init, false)
    }
}
