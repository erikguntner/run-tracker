import React, { useState } from 'react';
import TestMap from './TestMap';

const Test = props => {
  const [image, setImage] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);

  const fetchImage = () => {
    fetch('http://localhost:3090/image')
      .then(res => res.json())
      .then(data => {
        const base64 = data.data.toString('base64');
        console.log(base64);
        setImage(base64);
      })
      .catch(err => console.log(err));
  };

  // return an object with methods for retrieving query strings params
  let params = new URLSearchParams(props.location.search);
  // Get coordinates string format
  const coordsStr = params.get('coords');

  return (
    <div>
      <TestMap setMapLoaded={setMapLoaded} points={JSON.parse(coordsStr)} />
      <button onClick={fetchImage}>Save Image</button>
      {image && <img src={`data:image/png;base64, ${image}`} alt="map" />}
      {mapLoaded && <h1>Map is Loaded</h1>}
    </div>
  );
};

export default Test;
