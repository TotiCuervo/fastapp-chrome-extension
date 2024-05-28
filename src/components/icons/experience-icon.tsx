import { Hammer } from 'lucide-react'
import React from 'react'

interface IProps {
    className?: string
}

export default function ExperienceIcon({ className }: IProps) {
    return <Hammer className={className} />
}
