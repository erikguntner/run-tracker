import React, { useState } from 'react';
import RouteMap from './RouteMap';
import TestMap from './TestMap';

const Test = props => {
  const [image, setImage] = useState('');

  const fetchImage = () => {
    fetch('http://localhost:3090/image')
      .then(res => res.json())
      .then(data => setImage(data.data))
      .catch(err => console.log(err));
  };

  // return an object with methods for retrieving query strings params
  let params = new URLSearchParams(props.location.search);
  // Get coordinates string format
  const coordsStr = params.get('coords');

  console.log(image);

  return (
    <div>
      <TestMap points={JSON.parse(coordsStr)} />
      <button onClick={fetchImage}>Save Image</button>
      {image && <img src={`data:image/png;base64, ${image}`} alt="map" />}
    </div>
  );
};

export default Test;
