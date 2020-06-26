import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery'
import 'popper.js'
import React from 'react'

import 'bootstrap/dist/js/bootstrap.bundle.min'

import PageContent from './modules/PageContent.js'
require('./cookiesManager.js')

function App() {  
  return <PageContent />
}

export default App;
