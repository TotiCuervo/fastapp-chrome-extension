import { Alert } from '../../lib/types/alert'
import { ErrorAlert } from './error-alert'

interface IProps {
    alert: Alert | undefined
    className?: string
}

export default function Alerter({ alert, className }: IProps) {
    if (!alert) return null

    function render() {
        if (!alert) return null
        switch (alert.type) {
            case 'danger':
                return (
                    <ErrorAlert
                        message={alert.message}
                        className={className}
                    />
                )
            default:
                return null
        }
    }

    return render()
}
