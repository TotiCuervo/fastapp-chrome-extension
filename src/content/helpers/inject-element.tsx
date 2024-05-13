import ReactDOM from 'react-dom'

interface InjectElementProps {
    injectAfter: HTMLElement | null
    injectBefore?: HTMLElement | null
    element: JSX.Element
}

export default function injectElement({ injectAfter, injectBefore, element }: InjectElementProps) {
    if (injectAfter && injectBefore) {
        // Create a new div element to act as a container for your React component
        const buttonContainer = document.createElement('div')

        if (injectBefore) {
            // Insert the new container right after the content div
            injectAfter.parentNode?.insertBefore(buttonContainer, injectBefore)
        }

        // Create a shadow root
        const shadowRoot = buttonContainer.attachShadow({ mode: 'open' })

        const styleElement = document.createElement('style')
        styleElement.textContent = `
            :host {
                --background: 0 0% 98;
                --foreground: 240 10% 3.9%;
                --card: 0 0% 100%;
                --card-foreground: 240 10% 3.9%;
                --popover: 0 0% 100%;
                --popover-foreground: 240 10% 3.9%;
                --primary: 1 67% 51%;
                --primary-foreground: 60 9% 98%;
                --secondary: 240 4.8% 95.9%;
                --secondary-foreground: 240 5.9% 10%;
                --muted: 240 4.8% 95.9%;
                --muted-foreground: 240 3.8% 46.1%;
                --accent: 240 4.8% 95.9%;
                --accent-foreground: 240 5.9% 10%;
                --destructive: 0 84.2% 60.2%;
                --destructive-foreground: 0 0% 98%;
                --border: 240 5.9% 90%;
                --input: 240 5.9% 90%;
                --ring: 346.8 77.2% 49.8%;
                --radius: 0.5rem;
            }

            :host(.dark) {
                --background: 20 14.3% 4.1%;
                --foreground: 0 0% 95%;
                --card: 24 9.8% 10%;
                --card-foreground: 0 0% 95%;
                --popover: 0 0% 9%;
                --popover-foreground: 0 0% 95%;
                --primary: 1 67% 51%;
                --primary-foreground: 60 9% 98%;
                --secondary: 240 3.7% 15.9%;
                --secondary-foreground: 0 0% 98%;
                --muted: 0 0% 15%;
                --muted-foreground: 240 5% 64.9%;
                --accent: 12 6.5% 15.1%;
                --accent-foreground: 0 0% 98%;
                --destructive: 0 62.8% 30.6%;
                --destructive-foreground: 0 85.7% 97.3%;
                --border: 240 3.7% 15.9%;
                --input: 240 3.7% 15.9%;
                --ring: 1 67% 40%;
            }
        `
        shadowRoot.appendChild(styleElement)

        // Inject CSS into the shadow root
        const styleLink1 = document.createElement('link')
        styleLink1.rel = 'stylesheet'
        styleLink1.href = chrome.runtime.getURL('assets/tailwind.css')
        shadowRoot.appendChild(styleLink1)

        const styleLink2 = document.createElement('link')
        styleLink2.rel = 'stylesheet'
        styleLink2.href = chrome.runtime.getURL('assets/index.css')
        shadowRoot.appendChild(styleLink2)

        // Create a div to serve as the root for React
        const reactRoot = document.createElement('div')
        shadowRoot.appendChild(reactRoot)

        // Render your Button component inside the new container
        ReactDOM.render(element, reactRoot)
    } else {
        console.log('Required elements not found.')
    }
}
