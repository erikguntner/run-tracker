import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from './Map';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
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
      </BrowserRouter>
    );
  }
}

export default App;
