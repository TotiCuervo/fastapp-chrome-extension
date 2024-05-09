import { useQueryClient } from '@tanstack/react-query'
import { Keys } from '../keys'

export default function useSkillsQueryInvalidation() {
    const queryClient = useQueryClient()

    function invalidate(search: string) {
        return queryClient.invalidateQueries({ queryKey: Keys.search(search) })
    }

    return invalidate
}
