import React from 'react';
import RouteMap from './RouteMap';
import TestMap from './TestMap';

const Test = () => {
  const fetchImage = () => {
    fetch('https://pacific-crag-45485.herokuapp.com/image')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  const points = [[-117.731672, 34.106999], [-117.72708, 34.107004]];
  return (
    <div>
      <TestMap />
      <button onClick={fetchImage}>Save Image</button>
    </div>
  );
};

export default Test;
