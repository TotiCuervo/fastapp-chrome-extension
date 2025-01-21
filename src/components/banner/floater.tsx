import { useEffect, useRef, useState } from 'react'
import { EllipsisVertical } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { Switch } from '../ui/switch'

export default function Floater() {
    const floaterRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startY, setStartY] = useState(0)
    const [currentTop, setCurrentTop] = useState(293)
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState(false)

    useEffect(() => {
        chrome.storage.sync.get(['floaterTop', 'floaterActive'], (result) => {
            if (result.floaterTop) {
                setCurrentTop(result.floaterTop)
            }

            if (result.floaterActive !== undefined) {
                setActive(result.floaterActive)
            } else {
                chrome.storage.sync.set({ floaterActive: true })
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
            ref={floaterRef}
            className="border-primary-light group fixed right-0 cursor-pointer rounded-l-md border font-sans shadow-md"
            style={{ top: `${currentTop}px`, zIndex: 9999 }}
        >
            <div className="flex">
                <div className={twMerge('flex transition', active ? 'bg-primary' : 'bg-primary/70')}>
                    <div
                        className={twMerge(
                            'relative z-20 flex items-center justify-center rounded-l-md px-3 py-4 transition'
                        )}
                    >
                        <img
                            src={chrome.runtime.getURL('assets/secondary-logo.png')}
                            alt="FastApp Logo!"
                            className={'h-10 w-auto'}
                        />
                    </div>
                    <div
                        className={twMerge(
                            'z-10 flex w-0 items-center justify-center transition delay-75 group-hover:w-16'
                        )}
                    >
                        <Switch
                            className="invisible w-0 group-hover:visible group-hover:w-11 data-[state=checked]:bg-green-500"
                            checked={active}
                            onCheckedChange={() => {
                                setActive((prevActive) => !prevActive)
                                chrome.storage.sync.set({ floaterActive: !active })
                            }}
                        />
                    </div>
                </div>
                <div
                    className={twMerge(
                        'bg-primary-light flex w-0 cursor-grab items-center justify-center transition group-hover:w-8',
                        isDragging && 'w-8'
                    )}
                    onMouseDown={handleMouseDown}
                >
                    <EllipsisVertical className="text-white" size={24} />
                </div>
            </div>
        </div>
    )
}
