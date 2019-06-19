import {
  ADD_LOCATION,
  ADD_LINE,
  REMOVE_LATEST_POINT,
  CLEAR_ROUTE,
  CLOSE_ROUTE,
  API_CALL_ELEVATION,
  UPDATE_ELEVATION_DATA,
  CHANGE_TO_CLIP_PATH,
  SHOW_ELEVATION,
  UPDATE_TRANSPORTATION,
  UPDATE_VIEWPORT,
} from '../actions/types';
import { updateElevationData, removeLastPoint } from '../utils/mapUtils';

const initialState = {
  clipPath: true,
  elevation: false,
  maxElevation: -Infinity,
  minElevation: Infinity,
  transportationType: 'foot',
  elevationLoading: false,
  elevationData: [],
  startPoint: [],
  endPoint: [],
  viewport: {
    latitude: 34.105999576,
    longitude: -117.718497126,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  },
  geoJSONPoints: {
    type: 'FeatureCollection',
    properties: {
      color: '#0991D3',
    },
    features: [],
  },
  geoJSONLines: {
    type: 'FeatureCollection',
    properties: {
      color: '#0991D3',
    },
    features: [],
  },
  distance: [0],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_LOCATION:
      return {
        ...state,
        startPoint: action.payload.geometry.coordinates,
        endPoint: action.payload.geometry.coordinates,
        geoJSONPoints: {
          type: 'FeatureCollection',
          features: [...state.geoJSONPoints.features, action.payload],
        },
      };
    case ADD_LINE:
      return {
        ...state,
        endPoint: action.payload.newPoint.geometry.coordinates,
        geoJSONPoints: {
          type: 'FeatureCollection',
          features: [...state.geoJSONPoints.features, action.payload.newPoint],
        },
        geoJSONLines: {
          type: 'FeatureCollection',
          features: [...state.geoJSONLines.features, action.payload.newLine],
        },
        distance: [
          ...state.distance,
          state.distance[state.distance.length - 1] + action.payload.distance,
        ],
      };
    case API_CALL_ELEVATION:
      return {
        ...state,
        elevationLoading: !state.elevationLoading,
      };
    case CLEAR_ROUTE:
      return {
        ...state,
        distance: [0],
        startPoint: [],
        endPoint: [],
        elevationData: [],
        geoJSONPoints: {
          type: 'FeatureCollection',
          features: [],
        },
        geoJSONLines: {
          type: 'FeatureCollection',
          features: [],
        },
      };
    case CLOSE_ROUTE:
      return {
        ...state,
      };
    case CHANGE_TO_CLIP_PATH:
      return {
        ...state,
        clipPath: action.payload,
      };
    case REMOVE_LATEST_POINT:
      return removeLastPoint(state);
    case SHOW_ELEVATION:
      return {
        ...state,
        elevation: !state.elevation,
      };
    case UPDATE_ELEVATION_DATA:
      return updateElevationData(state, action.payload);
    case UPDATE_TRANSPORTATION:
      return {
        ...state,
        transportationType: action.payload,
      };
    case UPDATE_VIEWPORT:
      return {
        ...state,
        viewport: action.payload,
      };
    default:
      return state;
  }
}
