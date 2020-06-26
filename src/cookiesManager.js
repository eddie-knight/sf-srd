import Cookies from 'universal-cookie';
import DataSourceRequest from './modules/DataSourceRequest'

const cookies = new Cookies();
const style = cookies.get('layout') || 'Yeti'

require(`./styles/${style}.css`);
require('./styles/main.scss')

DataSourceRequest('__schema', [{'types': ['name']} ])
.then(canConnect => {
    const expiry = cookies.get("localStorageExpiry")
    if (canConnect && (!expiry || expiry < Date.now()) ) {
        localStorage.clear()
        console.log("Setting new localStorageExpiry value.")
        cookies.set("localStorageExpiry", (Date.now() + minutes(15)) )
    } else {
        console.log("Local storage will expire in:", `${expiry - Date.now()}ms`)
    }
}).catch((error) => {
    console.log("Could not fetch new data. Attempting to use existing data.")
})


function minutes(number) {
    return 60000 * number
}