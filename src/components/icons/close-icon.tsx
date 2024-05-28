import { XIcon } from 'lucide-react'
import React from 'react'

interface IProps {
    className?: string
}

export default function CloseIcon({ className }: IProps) {
    return <XIcon className={className} />
}
