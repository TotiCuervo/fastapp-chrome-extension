import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../../../../components/buttons/button'
export default function addApplyButtonToGreenhouse() {
    const contentDiv = document.getElementById('content')
    const applicationDiv = document.getElementById('application')

    if (contentDiv && applicationDiv) {
        // Create a new div element to act as a container for your React component
        const buttonContainer = document.createElement('div')

        // Insert the new container right after the content div
        contentDiv.parentNode?.insertBefore(buttonContainer, applicationDiv)

        // Render your Button component inside the new container
        ReactDOM.render(<Button>Apply Now</Button>, buttonContainer)
    } else {
        console.log('Required elements not found.')
    }
}
