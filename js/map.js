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
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
  })
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
//add values

// Load map with stores
map.on("load", function () {
  map.loadImage(
    "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
    // Add an image to use as a custom marker
    function (error, image) {
      if (error) throw error;
      map.addImage("custom-marker", image);

      map.addSource("places", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                description:
                  "<strong>Accident</strong><p>Accident has occured along cbd</p>",
              },
              geometry: {
                type: "Point",
                coordinates: [36.81667, -1.28333],
              },
            },
            {
              type: "Feature",
              properties: {
                description:
                  "<strong>Road block</strong><p>Road block along ngong road</p>",
              },
              geometry: {
                type: "Point",
                coordinates: [37.0833, -1.05],
              },
            },
            {
              type: "Feature",
              properties: {
                description:
                  "<strong>Road block</strong><p>Heavy traffic due to bloackage</p>",
              },
              geometry: {
                type: "Point",
                coordinates: [36.6566, -1.3618],
              },
            },
            {
              type: "Feature",
              properties: {
                description:
                  "<strong>Floods</strong><p>heavy rainfall caused flash floods along isinya</p>",
              },
              geometry: {
                type: "Point",
                coordinates: [36.848015, -1.688946],
              },
            },
            {
              type: "Feature",
              properties: {
                description:
                  "<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year's Seersucker Social bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>",
              },
              geometry: {
                type: "Point",
                coordinates: [-77.052477, 38.943951],
              },
            },
            {
              type: "Feature",
              properties: {
                description:
                  "<strong>Capital Pride Parade</strong><p>The annual Capital Pride Parade makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>",
              },
              geometry: {
                type: "Point",
                coordinates: [-77.043444, 38.909664],
              },
            },
            {
              type: "Feature",
              properties: {
                description:
                  "<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist Muhsinah plays the Black Cat (1811 14th Street NW) tonight with Exit Clov and Gods’illa. 9:00 p.m. $12.</p>",
              },
              geometry: {
                type: "Point",
                coordinates: [-77.031706, 38.914581],
              },
            },
            {
              type: "Feature",
              properties: {
                description:
                  "<strong>A Little Night Music</strong><p>The Arlington Players' production of Stephen Sondheim's <em>A Little Night Music</em> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>",
              },
              geometry: {
                type: "Point",
                coordinates: [-77.020945, 38.878241],
              },
            },
            {
              type: "Feature",
              properties: {
                description:
                  "<strong>Truckeroo</strong><p>Truckeroo brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>",
              },
              geometry: {
                type: "Point",
                coordinates: [-77.007481, 38.876516],
              },
            },
          ],
        },
      });

      // Add a layer showing the places.
      map.addLayer({
        id: "places",
        type: "symbol",
        source: "places",
        layout: {
          "icon-image": "custom-marker",
          "icon-allow-overlap": true,
        },
      });
    }
  );

  // Create a popup, but don't add it to the map yet.
  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  map.on("mouseenter", "places", function (e) {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = "pointer";

    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
  });

  map.on("mouseleave", "places", function () {
    map.getCanvas().style.cursor = "";
    popup.remove();
  });
});
