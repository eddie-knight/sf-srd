export function properList(data) {
    let columns = {}
    Object.keys(data).forEach(column => (
        columns[column] = (column.split("_").map(s => (
        s[0].toUpperCase() + s.slice(1) )).join(" ")
    )))
    console.log(columns)
    return columns
}
