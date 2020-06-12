import axios from 'axios';

function parse_fields(data) {
  // Parse dict of arrays into GraphQL request
  // Parameters
  //    fields - dict of field/table names from graphql
  //             each entry must contain list, but list may contain dicts
  let output = []
  if (typeof data != 'object') {
    return data || ''
  }
  Object.keys(data).forEach(field => {
    if (typeof data[field] == 'string') {
      output.push(data[field])
    } else {
      // If not string, list entry will be dict of subtypes with lists of desired values
      Object.keys(data[field]).forEach(subField => {
        output.push(`${subField} { name ${parse_fields(data[field][subField])} }`)
      })  
    }
  })
  return output.join(' ')
}

export default async function DataSourceRequest(type, fields) {
    let output = {}
    let query = { 'query': `{ ${type} { name ${parse_fields(fields)} } }` }
    console.log(query)
    await axios.post(`https://sfdatasource.com`, query)
    .then(response => {
      output = response.data.data[type]
    })
    .catch((error) => {
      console.error('Error on query:', query);
      throw TypeError('Unexpected response from DataSource API')
    });
    return output
}