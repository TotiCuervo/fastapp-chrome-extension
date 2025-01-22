import { useEffect, useState } from 'react'
import { useUserContext } from '../../lib/context/UserContext'
import useUserEducationQuery from '../../lib/query/education/useUserEducationQuery'
import useUserExperienceQuery from '../../lib/query/experience/useUserExperienceQuery'
import Education from '../../lib/types/education/education'
import Experience from '../../lib/types/experience/experience'
import ItemDisplay from './components/item-display'
import TotalData from './total-data'
import { Pointer } from 'lucide-react'
import SelectInput, { SelectOption } from '../../../src/components/select/select-input'
import usePortfoliosQuery from '../../../src/lib/query/portfolios/usePortfoliosQuery'
import { twMerge } from 'tailwind-merge'
import Header from './components/header/header'

interface LastItem {
    id: number
    type: 'education' | 'experience'
}

const DataRender = ({ item, selected }: { item: TotalData; selected: boolean }) => {
    let title = ''

    if (item.type === 'education') {
        title = (item.object as Education).school
    } else {
        title = (item.object as Experience).position
    }

    return (
        <div
            className={twMerge(
                'cursor-pointer flex-nowrap rounded-lg border border-transparent px-2 py-1 shadow',
                selected ? 'bg-muted' : 'hover:border-border hover:bg-card'
            )}
        >
            <h1 className="truncate text-nowrap">{title}</h1>
            <p className="truncate text-nowrap text-sm text-foreground/70">
                {item.type[0].toUpperCase() + item.type.slice(1)}
            </p>
        </div>
    )
}

export default function DashboardPage() {
    const { user } = useUserContext()
    const { data: userEducation = [], isLoading: educationLoading } = useUserEducationQuery({ userId: user?.id })
    const { data: userExperience = [], isLoading: experienceLoading } = useUserExperienceQuery({ userId: user?.id })
    const { data: portfolios = [] } = usePortfoliosQuery()

    const [item, setItem] = useState<TotalData | null>(null)
    const [filter, setFilter] = useState('All Items')
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        if (!educationLoading && !experienceLoading && item !== null) return

        const fetchLastItem = async () => {
            const { lastItem } = await chrome.storage.sync.get(['lastItem'])

            if (!lastItem) return

            const { id, type } = lastItem as LastItem

            if (type === 'education') {
                const item = userEducation.find((education) => education.id === id)
                if (item) setItem({ type: 'education', object: item })
            } else {
                const item = userExperience.find((experience) => experience.id === id)
                if (item) setItem({ type: 'experience', object: item })
            }
        }

        fetchLastItem()
    }, [educationLoading, experienceLoading])

    function handleSetItem(item: TotalData) {
        setItem(item)
        chrome.storage.sync.set({ lastItem: { id: item.object.id, type: item.type } })
    }

    const setType = (item: TotalData['object']) => {
        //@ts-ignore
        if (userEducation.includes(item)) {
            return 'education'
        }
        return 'experience'
    }

    const flatten = (arr: any[]): TotalData[] => {
        return arr
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((item) => ({ type: setType(item), object: item }))
    }

    const options: SelectOption[] = [
        {
            label: 'Types',
            items: ['All Items', 'Experience', 'Education']
        },
        {
            label: 'Profiles',
            items: [...portfolios.map((portfolio) => portfolio.name)]
        }
    ]

    const totalData: TotalData[] = flatten([...userEducation, ...userExperience])

    const filteredData = () => {
        let data = totalData

        if (filter === 'Education') {
            data = data.filter((item) => item.type === 'education')
        } else if (filter === 'Experience') {
            data = data.filter((item) => item.type === 'experience')
        } else if (portfolios.map((portfolio) => portfolio.name).includes(filter)) {
            const portfolio = portfolios.find((portfolio) => portfolio.name === filter)
            return flatten([...(portfolio?.education ?? []), ...(portfolio?.experience ?? [])])
        }

        if (searchText === '') return data

        return data.filter((item) => {
            const values = Object.values(item.object).map((value) => value?.toString().toLowerCase())
            return values.some((value) => {
                if (value) {
                    return value.includes(searchText.toLowerCase())
                }
                return false
            })
        })
    }

    return (
        <div className="flex h-full w-full flex-col">
            <Header searchText={searchText} setSearchText={setSearchText} />
            <div className="flex grow overflow-y-hidden">
                <div className="flex w-5/12 flex-col space-y-2 overflow-y-hidden border-r p-2 transition hover:overflow-y-auto">
                    <SelectInput options={options} value={filter} onChange={setFilter} />
                    {filteredData().map((filteredItem, index) => (
                        <div onClick={() => handleSetItem(filteredItem)}>
                            <DataRender
                                key={index}
                                item={filteredItem}
                                selected={item?.object.id === filteredItem.object.id}
                            />
                        </div>
                    ))}
                </div>
                <div className="w-7/12 overflow-y-auto">
                    {item ? (
                        <ItemDisplay item={item} />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center gap-2">
                            <Pointer size={28} />
                            <p className="text-lg font-bold">Click on an item</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
