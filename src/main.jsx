/* Pre Auth0 */
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

// Replace with your Auth0 domain and clientId from the Auth0 dashboard
const domain = 'dev-m26nhparnwirc7a0.us.auth0.com';
const clientId = 'CCizEngt41TvDA0mhX90JgBDHWzZQkzg';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>
);
