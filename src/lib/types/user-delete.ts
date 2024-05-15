import { User } from './user'

interface UserDelete<T extends { id: any }> {
    id: Required<T>['id']
    userId: User['id']
}

export default UserDelete
