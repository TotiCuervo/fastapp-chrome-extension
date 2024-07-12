import React, { useEffect, useState } from 'react'
import Experience from '../types/experience/experience'
import Education from '../types/education/education'
import Portfolio from '../types/portfolio/portfolio'
import { User } from '../types/user'

export default function useUserInfo() {
    const [experiences, setExperiences] = useState<Experience[]>([])
    const [educations, setEducations] = useState<Education[]>([])
    const [portfolios, setPortfolios] = useState<Portfolio[]>([])
    const [currentPortfolio, setCurrentPortfolio] = useState<Portfolio>()
    const [user, setUser] = useState<User>()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const data = await chrome.storage.sync.get([
                'experiences',
                'educations',
                'portfolios',
                'currentPortfolio',
                'user'
            ])

            setExperiences(data.experiences)
            setEducations(data.educations)
            setPortfolios(data.portfolios)
            setCurrentPortfolio(data.currentPortfolio)
            setUser(data.user)
            setLoaded(true)
        }

        fetchData()
    }, [])

    return {
        experiences,
        educations,
        portfolios,
        currentPortfolio,
        user,
        loaded
    }
}
