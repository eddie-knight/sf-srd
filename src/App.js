import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery'
import 'popper.js'
import React from 'react'
import Cookies from 'universal-cookie';

import 'bootstrap/dist/js/bootstrap.bundle.min'

import PageContent from './modules/PageContent.js'


const cookies = new Cookies();
const style = cookies.get('layout') || 'Yeti'
require(`./assets/${style}.css`);


function App() {  
  return (
    <>
    <div className="app">
      <PageContent />
    </div>
    </>
  );
}

export default App;
