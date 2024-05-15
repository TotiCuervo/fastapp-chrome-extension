import { useState } from 'react'
import { useUserContext } from '../../lib/context/UserContext'
import useUserEducationQuery from '../../lib/query/education/useUserEducationQuery'
import useUserExperienceQuery from '../../lib/query/experience/useUserExperienceQuery'
import Education from '../../lib/types/education/education'
import Experience from '../../lib/types/experience/experience'
import ItemDisplay from './components/item-display'
import TotalData from './total-data'

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

    console.log({ user, userEducation, userExperience })
    const setType = (item: TotalData['object']) => {
        //@ts-ignore
        if (userEducation.includes(item)) {
            return 'education'
        }
        return 'experience'
    }

    const totalData: TotalData[] = [...userEducation, ...userExperience, ...userExperience, ...userExperience]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((item) => ({ type: setType(item), object: item }))

    const [item, setItem] = useState<TotalData | null>(null)

    return (
        <div className="flex h-full w-full">
            <div className="flex h-full w-5/12 flex-col space-y-2 overflow-y-hidden border-r p-2 transition hover:overflow-y-auto">
                {totalData.map((item, index) => (
                    <div onClick={() => setItem(item)}>
                        <DataRender key={index} item={item} />
                    </div>
                ))}
            </div>
            <div className="w-7/12">{item ? <ItemDisplay item={item} /> : <div>Click on an item to view</div>}</div>
        </div>
    )
}
