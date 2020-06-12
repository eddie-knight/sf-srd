export function properList(data) {
    let columns = {}
    Object.keys(data).forEach(column => (
        columns[column] = columnToProper(column)
    ))
    return columns
}

export function columnToProper(data) {
    return data.split("_").map(split => (
        proper(split) )).join(" ").replace('And', '&')
}

export function proper(data) {
    return data[0].toUpperCase() + data.slice(1)
}

export function typecastNumber(value) {
    if (isNaN(value))
      return value
    return Number(value)
}
