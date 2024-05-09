import React from 'react'
import TotalData from '../total-data'
import Education from '../../../lib/types/education/education'
import Experience from '../../../lib/types/experience/experience'

interface IProps {
    item: TotalData
}

export default function ItemDisplay({ item }: IProps) {
    function getCopy() {
        if (item.type === 'education') {
            return [
                {
                    title: 'School',
                    value: (item.object as Education).school,
                },
                {
                    title: 'Degree',
                    value: (item.object as Education).degree,
                },
                {
                    title: 'Field of Study',
                    value: (item.object as Education).fieldOfStudy,
                },
            ]
        }

        return [
            {
                title: 'Position',
                value: (item.object as Experience).position,
            },
            {
                title: 'Company',
                value: (item.object as Experience).company.companyName,
            },
            {
                title: 'Description',
                value: (item.object as Experience).description,
            },
            {
                title: 'Experience Type',
                value: (item.object as Experience).experienceType,
            },
        ]
    }

    return (
        <div className="p-4">
            <h1>{item.type[0].toUpperCase() + item.type.slice(1)}</h1>
            <div className="space-y-3">
                {getCopy().map((item, index) => (
                    <div
                        className="rounded-md border p-2"
                        key={index}
                    >
                        <p className="">{item.title}</p>
                        <p className="">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
