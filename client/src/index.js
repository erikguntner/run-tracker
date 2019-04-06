import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Root from './Root';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Map from './components/Map/Map';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard/Dashboard';
import './stylesheets/index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Root>
    <BrowserRouter>
      <App>
        <Switch>
          <Route path="/signup" component={Signin} />
          <Route path="/signin" component={Signin} />
          <Route path="/profile" exact component={Dashboard} />
          <Route path="/" component={Map} />
        </Switch>
      </App>
    </BrowserRouter>
  </Root>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
