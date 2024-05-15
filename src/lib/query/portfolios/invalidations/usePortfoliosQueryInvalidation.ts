import { useQueryClient } from '@tanstack/react-query'
import { Keys } from '../keys'

export default function usePortfoliosQueryInvalidation() {
    const queryClient = useQueryClient()

    function invalidate() {
        return queryClient.invalidateQueries({ queryKey: Keys.portfolios })
    }

    return invalidate
}
