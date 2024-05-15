import client from '../../client'
import Portfolio from '../../types/portfolio/portfolio'

interface GetPortfolioProps {
    id: Portfolio['id']
}

export default async function getPortfolio({ id }: GetPortfolioProps) {
    return client.get(`/portfolios/${id}`)
}
