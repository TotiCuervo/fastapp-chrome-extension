import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Keys } from './keys'
import getPrompts from '../../endpoints/prompts/get-prompts'
import Prompt from '../../types/prompts/prompt'

export default function usePromptsQuery() {
    const queryClient = useQueryClient()

    function invalidate() {
        return queryClient.invalidateQueries({ queryKey: Keys.prompts })
    }

    return {
        ...useQuery<Prompt[]>({
            queryKey: Keys.prompts,
            queryFn: () => fetch()
        }),
        invalidate
    }
}

async function fetch() {
    const { data } = await getPrompts()
    return data.data
}
