import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery'
import 'popper.js'
import React from 'react'
import Cookies from 'universal-cookie';

import 'bootstrap/dist/js/bootstrap.bundle.min'

import PageContent from './modules/PageContent.js'


const cookies = new Cookies();
const style = cookies.get('layout') || 'Yeti'
require(`./styles/${style}.css`);
require('./styles/main.scss')

function App() {  
  return <PageContent />
}

export default App;
