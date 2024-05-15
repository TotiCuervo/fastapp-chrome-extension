import { useQueryClient } from '@tanstack/react-query'
import { Keys } from '../keys'

export default function useUserExperienceQueryInvalidation() {
    const queryClient = useQueryClient()

    function invalidate() {
        return queryClient.invalidateQueries({ queryKey: Keys.userExperience })
    }

    return invalidate
}
