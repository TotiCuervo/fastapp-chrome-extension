import client from '../../client'

export default async function getPortfolios() {
    return client.get('/portfolios')
}
