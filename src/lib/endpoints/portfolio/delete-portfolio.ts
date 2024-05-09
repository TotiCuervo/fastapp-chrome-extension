import client from '../../client'
import PortfolioDelete from '../../types/portfolio/portfolio-delete'

export default async function deletePortfolio({ id }: PortfolioDelete) {
    return client.delete(`/portfolios/${id}`)
}
