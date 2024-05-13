import React from 'react'
import Button from '../buttons/button'
export default function ApplyWithFastAppBanner() {
    return (
        <Button
            size="lg"
            variant="secondary"
            className="h-24 w-full"
            onClick={() => console.log('Apply with FastApp button clicked')}
        >
            <img src={chrome.runtime.getURL('assets/logo.png')} alt="FastApp Logo!" className="h-8 w-auto" />
            Apply with FastApp
        </Button>
    )
}
