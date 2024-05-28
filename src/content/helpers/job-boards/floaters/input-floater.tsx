import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import removeInputFloater from './helpers/remove-input-floater'

interface IProps {
    input: HTMLInputElement
}

export default function InputFloater({ input }: IProps) {
    const [divWidth, setDivWidth] = useState(0)

    const inputPaddingRight = window.getComputedStyle(input).getPropertyValue('padding-right')
    const inputPaddingTop = window.getComputedStyle(input).getPropertyValue('padding-top')
    const inputPaddingBottom = window.getComputedStyle(input).getPropertyValue('padding-bottom')

    const inputPaddingRightNumber = Number(inputPaddingRight.replace('px', ''))
    const inputPaddingTopNumber = Number(inputPaddingTop.replace('px', ''))
    const inputPaddingBottomNumber = Number(inputPaddingBottom.replace('px', ''))

    const divRef = useRef<HTMLDivElement>(null)

    const inputRect = input.getBoundingClientRect()

    const { top, right, height } = inputRect

    const floaterHeight = (height - inputPaddingBottomNumber - inputPaddingTopNumber) * 0.6
    const floaterTop = top + inputPaddingTopNumber - 1
    const floaterLeft = right - inputPaddingRightNumber * 2 - floaterHeight * 2.3196078431 + 5

    useEffect(() => {
        if (divRef.current) {
            setDivWidth(divRef.current.offsetWidth)
        }
    }, [divRef.current])

    function handleBlur() {
        removeInputFloater()
    }

    window.addEventListener('scroll', handleBlur)
    input.addEventListener('blur', handleBlur)

    return (
        <div
            ref={divRef}
            style={{
                top: `${floaterTop}px`,
                left: `${floaterLeft}px`,
                zIndex: 9999
            }}
            className={twMerge(
                `fixed z-50 cursor-pointer rounded-lg border bg-muted p-1 shadow transition hover:bg-muted/70`
            )}
        >
            <img
                style={{
                    height: `${floaterHeight}px`
                }}
                src={chrome.runtime.getURL('assets/logo.png')}
                alt="FastApp input floater"
                className={`h-full w-auto`}
            />
        </div>
    )
}
