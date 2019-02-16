import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Root from './Root';
import { BrowserRouter, Route } from 'react-router-dom';
import Map from './components/Map.js';
import UserProfile from './components/UserProfile';
import './stylesheets/index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Root>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Map} />
        <Route path="/profile" component={UserProfile} />
      </App>
    </BrowserRouter>
  </Root>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
