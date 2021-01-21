export const compareTwoNames = (a, b) => {
    return a.localeCompare(b)
}

export const getChatRoomString = (from, to) => {
    return compareTwoNames(from, to) > 0 ? `${from}-${to}` : `${to}-${from}`
}