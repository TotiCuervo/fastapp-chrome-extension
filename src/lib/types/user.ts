import { userType } from './userType'

export interface User {
    email: string
    password: string
    firstName: string
    lastName: string
    userType: userType
    minSalary: number
    id: number
}
