import client from '../../client'
import { User } from '../../types/user'

interface GetUserEducationProps {
    userId: User['id']
}

export default async function getUserEducation({ userId, ...props }: GetUserEducationProps) {
    return client.get(`/users/${userId}/education`)
}
