import React from 'react';
import RouteMap from './RouteMap';
import TestMap from './TestMap';

const Test = props => {
  const fetchImage = () => {
    fetch('http://localhost:3090/image')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  // return an object with methods for retrieving query strings params
  let params = new URLSearchParams(props.location.search);
  // Get coordinates string format
  const coordsStr = params.get('coords');

  return (
    <div>
      <TestMap points={JSON.parse(coordsStr)} />
      <button onClick={fetchImage}>Save Image</button>
    </div>
  );
};

export default Test;
