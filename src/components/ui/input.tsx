import * as React from 'react'

import { cn } from '../../lib/utils'

export interface InputProps extends React.ComponentProps<'input'> {
    left?: React.ReactNode
    right?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, left, right, ...props }, ref) => {
    return (
        <div
            className={cn(
                'flex h-9 w-full flex-row items-center gap-3 rounded-md border border-input bg-transparent px-3 shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring disabled:opacity-50',
                className
            )}
        >
            {left && (
                <div className="flex h-full items-center text-muted-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                    {left}
                </div>
            )}
            <input
                ref={ref}
                className={cn(
                    'h-full flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed'
                )}
                type={type}
                {...props}
            />
            {right && (
                <div className="flex h-full items-center text-muted-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                    {right}
                </div>
            )}
        </div>
    )
})

Input.displayName = 'Input'

export { Input }
