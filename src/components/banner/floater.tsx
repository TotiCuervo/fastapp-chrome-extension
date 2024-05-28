import { useEffect, useRef, useState } from 'react'
import { EllipsisVertical } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export default function Floater() {
    const floaterRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startY, setStartY] = useState(0)
    const [currentTop, setCurrentTop] = useState(293)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        chrome.storage.sync.get(['floaterTop'], (result) => {
            if (result.floaterTop) {
                setCurrentTop(result.floaterTop)
            }
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        const handleMouseMove = (event: any) => {
            if (isDragging) {
                const deltaY = event.clientY - startY
                setCurrentTop((prevTop) => Math.max(0, prevTop + deltaY))
                setStartY(event.clientY)
                chrome.storage.sync.set({ floaterTop: currentTop })
            }
        }

        const handleMouseUp = () => {
            setIsDragging(false)
        }

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        } else {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging, startY])

    const handleMouseDown = (event: any) => {
        setIsDragging(true)
        setStartY(event.clientY)
    }

    if (loading) return null

    return (
        <div
            id="fastapp-floater"
            ref={floaterRef}
            className="group fixed right-0 cursor-pointer rounded-l-md font-sans shadow-md"
            style={{ top: `${currentTop}px`, zIndex: 9999 }}
        >
            <div className="flex">
                <div className="flex items-center justify-center rounded-l-md bg-primary px-3 py-4">
                    <img
                        src={chrome.runtime.getURL('assets/secondary-logo.png')}
                        alt="FastApp Logo!"
                        className="h-10 w-auto"
                    />
                </div>
                <div
                    className={twMerge(
                        'flex w-0 cursor-grab items-center justify-center transition group-hover:w-8',
                        isDragging && 'w-8'
                    )}
                    style={{ backgroundColor: 'rgb(229, 83, 83)' }}
                    onMouseDown={handleMouseDown}
                >
                    <EllipsisVertical className="text-white" size={24} />
                </div>
            </div>
        </div>
    )
}
