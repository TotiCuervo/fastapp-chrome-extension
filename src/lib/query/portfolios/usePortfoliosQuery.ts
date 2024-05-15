import Portfolio from '../../types/portfolio/portfolio'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Keys } from './keys'
import getPortfolios from '../../endpoints/portfolio/get-portfolios'

export default function usePortfoliosQuery() {
    const queryClient = useQueryClient()

    function invalidate() {
        return queryClient.invalidateQueries({ queryKey: Keys.portfolios })
    }

    return {
        ...useQuery<Portfolio[]>({
            queryKey: Keys.portfolios,
            queryFn: () => fetch(),
        }),
        invalidate,
    }
}

async function fetch() {
    const { data } = await getPortfolios()
    return data.data
}
