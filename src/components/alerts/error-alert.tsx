import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert'

interface IProps {
    message: string
    className?: string
}

export function ErrorAlert({ message, className }: IProps) {
    return (
        <Alert
            variant="destructive"
            className={className}
        >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}
