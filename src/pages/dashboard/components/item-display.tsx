import TotalData from '../total-data'
import Education from '../../../lib/types/education/education'
import Experience from '../../../lib/types/experience/experience'
import CopiableCard from '../../../../src/components/copy/copiable-card'
import EducationIcon from '../../../../src/components/icons/education-icon'
import ExperienceIcon from '../../../../src/components/icons/experience-icon'
import CT from '../../../../src/components/copy/copiable-text'

interface IProps {
    item: TotalData
}

export default function ItemDisplay({ item }: IProps) {
    function getCopy() {
        if (item.type === 'education') {
            return [
                {
                    title: 'Degree',
                    value: (item.object as Education).degree
                },
                {
                    title: 'Field of Study',
                    value: (item.object as Education).fieldOfStudy
                }
            ]
        }

        return [
            {
                title: 'Company',
                value: (item.object as Experience).company.companyName
            },
            {
                title: 'Description',
                value: (item.object as Experience).description
            },
            {
                title: 'Experience Type',
                value: (item.object as Experience).experienceType
            }
        ]
    }

    function getHeader() {
        if (item.type === 'education') {
            return (item.object as Education).school
        }

        return (item.object as Experience).position
    }

    function getType() {
        return item.type[0].toUpperCase() + item.type.slice(1)
    }

    function getIcon() {
        switch (item.type) {
            case 'education':
                return <EducationIcon className="size-4 text-foreground/70" />
            case 'experience':
                return <ExperienceIcon className="size-4 text-foreground/70" />
            default:
                return <></>
        }
    }

    return (
        <div className="px-8 py-4">
            <div className="flex items-center pb-4">
                <div className="pr-2">{getIcon()}</div>
                <p className="text-sm text-foreground/70">{getType()}</p>
            </div>
            <CT className="text-2xl font-bold">{getHeader()}</CT>

            <div className="space-y-3 pt-8">
                {getCopy().map((item, index) => (
                    <CopiableCard key={index} copyText={item.value} leftDistance={7.5}>
                        <div>
                            <p className="text-xs font-light text-primary/70">{item.title}</p>
                            <p className="">{item.value}</p>
                        </div>
                    </CopiableCard>
                ))}
            </div>
        </div>
    )
}
