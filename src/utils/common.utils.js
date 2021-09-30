exports.multipleColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid ibput')
    }

    const keys = Object.keys(object)
    const values = Object.values(object)

    columnSet = keys.map(key => `${key} = ?`).join(', ')

    return {
        columnSet,
        values
    }
}