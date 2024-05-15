import client from '../../client'
import PortfolioInsert from '../../types/portfolio/portfolio-insert'

export default async function createPortfolio({
    experiences = [],
    skills = [],
    education = [],
    ...props
}: PortfolioInsert) {
    return client.post('/portfolios', {
        ...props,
        experiences,
        skills,
        education,
    })
}
