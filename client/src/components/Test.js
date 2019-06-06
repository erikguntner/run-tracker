import React from 'react';
import RouteMap from './RouteMap';
import TestMap from './TestMap';

const Test = () => {
  const points = [[-117.731672, 34.106999], [-117.72708, 34.107004]];
  return (
    <div>
      <h1>WElcome to react</h1>
      <TestMap />
    </div>
  );
};

export default Test;
