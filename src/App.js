import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery'
import 'popper.js'
import React from 'react'
import Cookies from 'universal-cookie';

import 'bootstrap/dist/js/bootstrap.bundle.min'

import DataSourceContent from './DataSourceContent.js'


const cookies = new Cookies();
const style = cookies.get('layout') || 'Yeti'
require(`./${style}.css`);


function App() {  
  return (
    <>
    <div className="app">
      <DataSourceContent />
    </div>
    </>
  );
}

export default App;
