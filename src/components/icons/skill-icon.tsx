import { PencilRulerIcon } from 'lucide-react'
import React from 'react'

interface IProps {
    className?: string
}

export default function SkillIcon({ className }: IProps) {
    return <PencilRulerIcon className={className} />
}
