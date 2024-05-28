import Button from '../buttons/button'

interface IProps {
    onClick: () => void
}

export default function ApplyWithFastAppBanner({ onClick }: IProps) {
    return (
        <Button
            size="lg"
            variant="default"
            className="my-4 h-24 w-full text-2xl font-bold italic shadow"
            onClick={onClick}
        >
            <img
                src={chrome.runtime.getURL('assets/secondary-logo.png')}
                alt="FastApp Logo!"
                className="mr-4 h-12 w-auto"
            />
            Apply with FastApp!
        </Button>
    )
}
