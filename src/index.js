import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.render(
<Auth0Provider 
  domain="dev-zmn26yfz.us.auth0.com"
  clientId="qgNfyno4isKlcgfmkC23iMegGEFoCyqn"
  redirectUri={window.location.origin}
  > 
    <App 
  githubURL="https://github.com/completejavascript/pomodoro-clock" 
  defaultBreakLength='5' 
  defaultSessionLength='25' />
  
  </Auth0Provider>, 
  document.getElementById('root')
);




