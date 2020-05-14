import axios from 'axios';

// const search = evt => {
//   evt.preventDefault();
//   if (evt.key === "Enter") {
//     //   
//   }
// }

export default async function DataSourceRequest(type, fields) {
    let output = {}
    await axios.post(`https://sfdatasource.com`, { 'query': `{ ${type} { name ${fields} } }` })
    .then(response => {
      output = response.data.data[type]
    })
    .catch((error) => {
      console.error('Error:', error);
      output = error
    });
    return output
}