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

var layerList = document.getElementById("menu");
var inputs = layerList.getElementsByTagName("input");

function switchLayer(layer) {
  var layerId = layer.target.id;
  map.setStyle("mapbox://styles/mapbox/" + layerId);
}

for (var i = 0; i < inputs.length; i++) {
  inputs[i].onclick = switchLayer;
}

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
  })
);
