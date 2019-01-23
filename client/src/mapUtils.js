import { getDistanceFromLatLonInMi, roundTo } from './utils';

export const updateElevationData = (state, elevationData) => {
  let distance = +state.distance[state.distance.length - 2].toFixed(2);

  const points = state.geoJSONLines.features[state.geoJSONLines.features.length - 1].geometry
    .coordinates[0];

  const elevationDataArr = elevationData.results.map((location, i) => {
    const endingLong = location.location.lng;
    const endingLat = location.location.lat;
    const startingLong = i === 0 ? points[0] : elevationData.results[i - 1].location.lng;
    const startingLat = i === 0 ? points[1] : elevationData.results[i - 1].location.lat;

    const distanceBetweenPoints = getDistanceFromLatLonInMi(
      startingLat,
      startingLong,
      endingLat,
      endingLong,
    );
    distance += distanceBetweenPoints;

    const roundedDistance = roundTo(distance, 2);

    return {
      elevation: roundTo(location.elevation * 3.28084, 2),
      distance: roundedDistance,
    };
  });

  // const { maxElevation, minElevation } = calculateMinAndMaxElevation(
  //   [...state.elevationData, elevationDataArr],
  //   state,
  // );

  // console.log(maxElevation, minElevation);

  return {
    ...state,
    elevationLoading: !state.elevationLoading,
    elevationData: [...state.elevationData, elevationDataArr],
  };
};

export const removeLastPoint = (state) => {
  const endPoint = state.geoJSONPoints.features.length > 1
    ? state.geoJSONPoints.features[state.geoJSONPoints.features.length - 2]
      .geometry.coordinates
    : [];

  if (state.geoJSONLines.features.length === 0) {
    return {
      ...state,
      endPoint,
      elevationData: [...state.elevationData.slice(0, -1)],
      geoJSONPoints: {
        type: 'FeatureCollection',
        features: [...state.geoJSONPoints.features.slice(0, -1)],
      },
      geoJSONLines: {
        type: 'FeatureCollection',
        features: [...state.geoJSONLines.features.slice(0, -1)],
      },
    };
  }
  return {
    ...state,
    endPoint,
    viewport: {
      ...state.viewport,
      latitude: endPoint.length !== 0 ? endPoint[1] : state.startPoint[1],
      longitude: endPoint.length !== 0 ? endPoint[0] : state.startPoint[0],
    },
    elevationData: [...state.elevationData.slice(0, -1)],
    geoJSONPoints: {
      type: 'FeatureCollection',
      features: [...state.geoJSONPoints.features.slice(0, -1)],
    },
    geoJSONLines: {
      type: 'FeatureCollection',
      features: [...state.geoJSONLines.features.slice(0, -1)],
    },
    distance: [...state.distance.slice(0, -1)],
  };
};

// /////////////////////////////////////
// Helper function to calculate difference in elevation changes
// /////////////////////////////////////

const calculateMinAndMaxElevation = (elevationData, state) => {
  let maxElevation;
  let minElevation;

  const sortedElevationData = elevationData[elevationData.length - 1].sort(
    (a, b) => a.elevation + b.elevation,
  );

  if (
    sortedElevationData[sortedElevationData.length - 1].elevation
    > state.maxElevation
    && sortedElevationData[0].elevation < state.minElevation
  ) {
    maxElevation = sortedElevationData[sortedElevationData.length - 1].elevation;
    minElevation = sortedElevationData[0].elevation;
  } if (
    sortedElevationData[sortedElevationData.length - 1].elevation
    > state.maxElevation
  ) {
    maxElevation = sortedElevationData[sortedElevationData.length - 1].elevation;
    minElevation = state.minElevation;
  } if (sortedElevationData[0].elevation < state.minElevation) {
    maxElevation = state.maxElevation;
    minElevation = sortedElevationData[0].elevation;
  }

  return {
    maxElevation,
    minElevation,
  };
};
