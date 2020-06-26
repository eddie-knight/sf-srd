import axios from 'axios';

class DataSourceError extends Error {
}

function parse_fields(data) {
  // Parse dict of arrays into GraphQL request
  // Parameters
  //    data - dict of field/table names from graphql
  //             each dict entry must contain list, but list may contain dicts
  let output = []
  if (typeof data != 'object') {
    if (data[0] === '_') {
      return data.slice(1)
    }
    return data || ''
  }
  Object.keys(data).forEach(field => {
    if (typeof data[field] == 'string') {
      if (data[field][0] === '_') {
        output.push(data[field].slice(1))
      } else {
        output.push(data[field])
      }
    } else {
      // If not string, list entry will be dict of subtypes with lists of desired values
      Object.keys(data[field]).forEach(subField => {
        output.push(`${subField} { ${parse_fields(data[field][subField])} }`)
      })
    }
  })
  return output.join(' ')
}

export default async function DataSourceRequest(type, fields, terms='') {
    let output = {}
    let query = { 'query': `{ ${type}${terms} { ${parse_fields(fields)} } }` }
    await axios.post(`https://sfdatasource.com`, query)
    .then(response => {
      output = response.data.data[type]
    })
    .catch((error) => {
      console.error('Error on query:', query['query'], error);
      throw new DataSourceError('Unexpected response from DataSource API; See logs for details.')
    });
    return output
}