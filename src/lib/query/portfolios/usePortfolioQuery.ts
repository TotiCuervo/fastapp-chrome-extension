import Portfolio from '../../types/portfolio/portfolio'
import { useQuery } from '@tanstack/react-query'
import { Keys } from './keys'
import getPortfolio from '../../endpoints/portfolio/get-portfolio'

interface usePortfolioQueryProps {
    id: Portfolio['id'] | undefined
}

export default function usePortfolioQuery({ id }: usePortfolioQueryProps) {
    return {
        ...useQuery<Portfolio>({
            queryKey: Keys.portfolio(id!!),
            queryFn: () => fetch({ id: id!! }),
            enabled: !!id,
        }),
    }
}

async function fetch({ id }: { id: Portfolio['id'] }) {
    const { data } = await getPortfolio({ id })
    return data.data
}
