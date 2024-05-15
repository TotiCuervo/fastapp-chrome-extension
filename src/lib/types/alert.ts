export interface Alert {
    show: boolean
    type: 'sucess' | 'danger' | 'warning' | 'info'
    message: string
}
