import React from 'react';

const Route = ({ distance }) => {
  console.log(distance);
  return <div>{distance[distance.length - 1]} miles</div>;
};

export default Route;
