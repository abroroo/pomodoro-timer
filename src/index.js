import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";



ReactDOM.render(
<Router>
  <Auth0ProviderWithHistory>
  <App 
  githubURL="https://github.com/completejavascript/pomodoro-clock" 
  defaultBreakLength='5' 
  defaultSessionLength='25' />
  </Auth0ProviderWithHistory>
</Router>, 
  document.getElementById('root')
);




