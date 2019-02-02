window.URL.createObjectURL = function() {};
jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({}),
}));
