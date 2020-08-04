mapboxgl.accessToken =
  "pk.eyJ1IjoiamtpdHNhbyIsImEiOiJja2QwMWFvcnYwcDk2MzBsN3p4bXZmbzA1In0.yCKFXODdTQSRykFb60p4jg";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 9,
  center: [36.81667, -1.28333],
});
//add icon to the map
map.addControl(
  new MapboxDirections({
    accessToken: mapboxgl.accessToken,
  }),
  "top-left"
);
