interface Delete<T extends { id: any }> {
    id: Required<T>['id']
}

export default Delete
