import { useQueryClient } from '@tanstack/react-query'
import { Keys } from '../keys'

export default function useUserEducationQueryInvalidation() {
    const queryClient = useQueryClient()

    function invalidate() {
        return queryClient.invalidateQueries({ queryKey: Keys.userEducation })
    }

    return invalidate
}
