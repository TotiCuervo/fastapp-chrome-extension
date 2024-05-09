import { useQueryClient } from '@tanstack/react-query'
import { Keys } from '../keys'
import Portfolio from '../../../types/portfolio/portfolio'
export default function usePortfolioQueryInvalidation() {
    const queryClient = useQueryClient()

    function invalidate(portfolioId: Portfolio['id']) {
        return queryClient.invalidateQueries({ queryKey: Keys.portfolio(portfolioId) })
    }

    return invalidate
}
