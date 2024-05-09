import { useQueryClient } from '@tanstack/react-query'
import { Keys } from '../keys'

export default function useSkillsQueryInvalidation() {
    const queryClient = useQueryClient()

    function invalidate() {
        return queryClient.invalidateQueries({ queryKey: Keys.skills() })
    }

    return invalidate
}
