import { useQuery } from '@tanstack/react-query'
import { Keys } from './keys'
import Education from '../../types/education/education'
import getUserEducation from '../../endpoints/education/get-user-education'
import { User } from '../../types/user'

interface IProps {
    userId?: User['id']
}

export default function useUserEducationQuery({ userId }: IProps) {
    return useQuery<Education[]>({
        queryKey: Keys.userEducation,
        queryFn: () => fetch({ userId: userId!! }),
        enabled: !!userId,
    })
}

async function fetch({ userId }: { userId: User['id'] }) {
    const { data } = await getUserEducation({ userId })
    return data.data as Education[]
}
