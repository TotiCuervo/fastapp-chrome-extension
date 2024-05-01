import { Loader2 } from 'lucide-react'
import { Button as ShadcnButton, ButtonProps as shadcnButtonProps } from '../ui/button'

interface Buttonprops extends shadcnButtonProps {
    loading?: boolean
    loadingText?: string
}

export default function Button({ loading, loadingText, children, ...props }: Buttonprops) {
    const isDisabled = props.disabled || loading

    return (
        <ShadcnButton
            {...props}
            disabled={isDisabled}
        >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? loadingText : children}
        </ShadcnButton>
    )
}
