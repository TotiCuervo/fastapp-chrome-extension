import { ClipboardIcon, ThumbsUpIcon } from 'lucide-react'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { toast } from 'sonner'

interface CopiableTextProps {
    children: React.ReactNode
    copyText: string
    className?: string
    hoveringChild?: boolean
    leftDistance?: number
}

export default function CopiableCard({
    children,
    className,
    copyText,
    hoveringChild,
    leftDistance = 15
}: CopiableTextProps) {
    const [isCopied, setIsCopied] = useState(false)

    function copyToClipboard() {
        if (hoveringChild) return
        navigator.clipboard.writeText(copyText)
        setIsCopied(true)
        toast.success(`"${copyText}" copied to clipboard!`)
    }

    return (
        <div
            className={twMerge(
                'group/card relative flex cursor-pointer flex-col rounded-lg border bg-card px-4 py-2 shadow-sm transition',
                hoveringChild
                    ? null
                    : isCopied
                      ? 'hover:border-green-500'
                      : 'border-transparent hover:border-foreground',
                className
            )}
            onClick={copyToClipboard}
            onMouseLeave={() =>
                setTimeout(() => {
                    setIsCopied(false)
                }, 500)
            }
        >
            {children}

            <div
                className={twMerge(
                    `absolute bottom-0 top-0 z-20 mt-[4px] text-transparent transition`,
                    hoveringChild
                        ? null
                        : isCopied
                          ? 'group-hover/card:text-green-500'
                          : 'group-hover/card:text-foreground'
                )}
                style={{
                    left: `calc(100% + ${leftDistance}px)`
                }}
            >
                {!isCopied ? (
                    <ClipboardIcon size={15} className="transition group-active/card:rotate-[20deg]" />
                ) : (
                    <ThumbsUpIcon size={15} className="transition group-active/card:rotate-[20deg]" />
                )}
            </div>
        </div>
    )
}
