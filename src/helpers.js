export function properList(data) {
    let columns = {}
    Object.keys(data).forEach(column => (
        columns[column] = (column.split("_").map(split => (
        proper(split) )).join(" ")
    )))
    return columns
}

export function proper(data) {
    return data[0].toUpperCase() + data.slice(1)
}

export function typecastNumber(value) {
    if (isNaN(value))
      return value
    return Number(value)
}
