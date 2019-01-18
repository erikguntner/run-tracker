import { getDistanceFromLatLonInMi, roundTo } from './utils';

export const updateElevationData = (state, elevationData) => {
  let elevationDataArr;
  let distance = +(state.distance[state.distance.length - 2].toFixed(2));

  const points = state.geoJSONLines.features[state.geoJSONLines.features.length - 1].geometry.coordinates[0];

  elevationDataArr = elevationData.results.map((location, i) => {
    const endingLong = location.location.lng;
    const endingLat = location.location.lat;
    let startingLong;
    let startingLat;

    if (i === 0) {
      startingLong = points[0];
      startingLat = points[1];
    } else {
      startingLong = elevationData.results[i - 1].location.lng;
      startingLat = elevationData.results[i - 1].location.lat;
    }

    const distanceBetweenPoints = getDistanceFromLatLonInMi(startingLat, startingLong, endingLat, endingLong);
    distance += distanceBetweenPoints;

    const roundedDistance = roundTo(distance, 2)

    return {
      elevation: roundTo((location.elevation * 3.28084), 2),
      distance: roundedDistance
    };
  });

  const { maxElevation, minElevation } = calculateMinAndMaxElevation([...state.elevationData, elevationDataArr], state);

  return {
    ...state,
    elevationLoading: !state.elevationLoading,
    elevationData: [...state.elevationData, elevationDataArr],
    maxElevation,
    minElevation
  }
}

///////////////////////////////////////
// Helper function to calculate difference in elevation changes
///////////////////////////////////////

const calculateMinAndMaxElevation = (elevationData, state) => {

  if (elevationData.length < 1) return;

  console.log('calculate')

  const sortedElevationData = elevationData[elevationData.length - 1].sort((a, b) => a.elevation + b.elevation);

  if (sortedElevationData[sortedElevationData.length - 1].elevation > state.maxElevation && sortedElevationData[0].elevation < state.minElevation) {
    return {
      maxElevation: sortedElevationData[sortedElevationData.length - 1].elevation,
      minElevation: sortedElevationData[0].elevation
    }
  } else if (sortedElevationData[sortedElevationData.length - 1].elevation > state.maxElevation) {
    return {
      maxElevation: sortedElevationData[sortedElevationData.length - 1].elevation,
      minElevation: state.minElevation
    }
  } else if (sortedElevationData[0].elevation < state.minElevation) {
    return {
      maxElevation: state.maxElevation,
      minElevation: sortedElevationData[0].elevation
    };
  }
}