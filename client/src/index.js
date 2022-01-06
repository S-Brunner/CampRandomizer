import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { CamperProvider } from "./campersContext";


ReactDOM.render(
  <CamperProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CamperProvider>
  ,document.getElementById('root')
);

