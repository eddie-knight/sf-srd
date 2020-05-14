import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';

import './yeti.css';
import DataSourceContent from './DataSourceContent.js'

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
