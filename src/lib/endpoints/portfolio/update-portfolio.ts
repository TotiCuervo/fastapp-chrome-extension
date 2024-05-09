import client from '../../client'
import PortfolioUpdate from '../../types/portfolio/portfolio-update'

export default async function UpdatePortfolio({ id, experiences = [], ...props }: PortfolioUpdate) {
    return client.patch(`/portfolios/${id}`, {
        ...props,
        experiences,
    })
}
