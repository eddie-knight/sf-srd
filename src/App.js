import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery'
import 'popper.js'
import React from 'react'
import Cookies from 'universal-cookie';

import 'bootstrap/dist/js/bootstrap.bundle.min'

import DataSourceContent from './DataSourceContent.js'


const cookies = new Cookies();

if (cookies.get('dark-mode') === 'true') {
  require('./slate.css');
} else {
  require('./yeti.css');
}


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
