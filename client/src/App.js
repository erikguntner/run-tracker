import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from './components/Map';

class App extends Component {
  render() {
    return (
      <Router>
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Route path="/" exact component={Map} />
        </div>
      </Router>
    );
  }
}

export default App;
