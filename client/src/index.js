import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { CamperProvider } from "./campersContext";
import { CabinProvider } from "./cabinContext";


ReactDOM.render(
    <CabinProvider>
      <CamperProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </CamperProvider>
    </CabinProvider>
  ,document.getElementById('root')
);

