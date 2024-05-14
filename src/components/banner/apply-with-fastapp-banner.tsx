import React from 'react'
import Button from '../buttons/button'

interface IProps {
    onClick: () => void
}

export default function ApplyWithFastAppBanner({ onClick }: IProps) {
    return (
        <Button
            size="lg"
            variant="secondary"
            className="h-24 w-full"
            onClick={onClick}
        >
            <img
                src={chrome.runtime.getURL('assets/logo.png')}
                alt="FastApp Logo!"
                className="h-8 w-auto"
            />
            Apply with FastApp
        </Button>
    )
}
