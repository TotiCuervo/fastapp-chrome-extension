import { GraduationCap, Hammer } from 'lucide-react'
import React from 'react'

interface IProps {
    className?: string
}

export default function EducationIcon({ className }: IProps) {
    return <GraduationCap className={className} />
}
