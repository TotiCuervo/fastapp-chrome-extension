import client from '../../client'
import Experience from '../../types/experience/experience'
import LaravelResponse from '../../types/misc/laravel-response'
import { User } from '../../types/user'

interface GetUserExperienceProps {
    userId: User['id']
}

export default async function getUserExperience({ userId, ...props }: GetUserExperienceProps) {
    return client.get<LaravelResponse<Experience[]>>(`/users/${userId}/experience`)
}
