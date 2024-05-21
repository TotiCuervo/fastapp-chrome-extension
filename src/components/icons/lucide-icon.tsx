import { icons } from 'lucide-react'

export type LucideIconName = keyof typeof icons

interface LucideIconProps {
    name: LucideIconName
    color?: string
    size?: number
    className?: string
}

export default function LucideIcon({ name, color, size, className }: LucideIconProps) {
    const Icon = icons[name]

    return (
        <Icon
            color={color}
            size={size}
            className={className}
        />
    )
}
