import { useState } from 'react'
import { useUserContext } from '../../lib/context/UserContext'
import useUserEducationQuery from '../../lib/query/education/useUserEducationQuery'
import useUserExperienceQuery from '../../lib/query/experience/useUserExperienceQuery'
import Education from '../../lib/types/education/education'
import Experience from '../../lib/types/experience/experience'
import ItemDisplay from './components/item-display'
import TotalData from './total-data'
import { Input } from '../../../src/components/ui/input'
import Button from '../../../src/components/buttons/button'
import { Sparkles } from 'lucide-react'
import SelectInput, { SelectOption } from '../../../src/components/select/select-input'
import usePortfoliosQuery from '../../../src/lib/query/portfolios/usePortfoliosQuery'

const DataRender = ({ item }: { item: TotalData }) => {
    let title = ''

    if (item.type === 'education') {
        title = (item.object as Education).school
    } else {
        title = (item.object as Experience).position
    }

    return (
        <div className="cursor-pointer flex-nowrap rounded-lg border border-transparent px-2 py-1 shadow hover:border-border hover:bg-card">
            <h1 className="truncate text-nowrap">{title}</h1>
            <p className="truncate text-nowrap text-sm text-foreground/70">
                {item.type[0].toUpperCase() + item.type.slice(1)}
            </p>
        </div>
    )
}

export default function DashboardPage() {
    const { user } = useUserContext()
    const { data: userEducation = [] } = useUserEducationQuery({ userId: user?.id })
    const { data: userExperience = [] } = useUserExperienceQuery({ userId: user?.id })
    const { data: portfolios = [] } = usePortfoliosQuery()

    const [item, setItem] = useState<TotalData | null>(null)
    const [filter, setFilter] = useState('All Items')
    const [searchText, setSearchText] = useState('')

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

    const totalData: TotalData[] = flatten([...userEducation, ...userExperience, ...userExperience, ...userExperience])

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
            return values.some((value) => value.includes(searchText.toLowerCase()))
        })
    }

    return (
        <div className="flex h-full w-full flex-col">
            <div className="flex w-full gap-4 border-b px-4 py-2">
                <div className="flex grow">
                    <Input className="h-9" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                </div>
                <Button size="sm">
                    <div className="pr-1">
                        <Sparkles size={16} />
                    </div>
                    Wizard
                </Button>
            </div>

            <div className="flex grow overflow-y-hidden">
                <div className="flex w-5/12 flex-col space-y-2 overflow-y-hidden border-r p-2 transition hover:overflow-y-auto">
                    <SelectInput options={options} value={filter} onChange={setFilter} />
                    {filteredData().map((item, index) => (
                        <div onClick={() => setItem(item)}>
                            <DataRender key={index} item={item} />
                        </div>
                    ))}
                </div>
                <div className="w-7/12">{item ? <ItemDisplay item={item} /> : <div>Click on an item to view</div>}</div>
            </div>
        </div>
    )
}
