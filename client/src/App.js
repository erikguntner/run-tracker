import React, { Component } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default App;
