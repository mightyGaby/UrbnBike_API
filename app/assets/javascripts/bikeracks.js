var map;
var markers;
var newMarker;
var downTime;
var upTime;

$(document).ready(function(){

  //=========================================CREATES MAP
  L.mapbox.accessToken = 'pk.eyJ1IjoiZ2FicmllbGxlaWRhcnVpemZ1bmVzIiwiYSI6IjNjNGQ5MjM3MmMxMGI1YzNlMDJlZDZlYzA3NTc5NTJhIn0.rN0bLsGk3EFALg_1zo09eg';
  map = L.mapbox.map('map', 'mapbox.streets')
      .setView([41.893974, -87.627945], 14);
      map.zoomControl.setPosition('bottomleft');

  console.log("map loaded!")

  var geojson;


  //=========================================LOADS MARKERS FROM DATABASE
  function getData() {
    return $.ajax({
      url: '/api/markers.json',
      type: 'get',
      dataType: 'text'
      });
  }


  function renderMarkers(data) {
    geojson = $.parseJSON(data);
    console.log(geojson);
    markers = L.mapbox.featureLayer()
      .setGeoJSON({
        type: 'FeatureCollection',
        features: geojson
      })
      .addTo(map);

    markers.eachLayer(function(m) {
      // // Shorten m.feature.properties to p for convenience.
      // var p = m.feature.properties;

      m.on("dblclick", function(){
        console.log(m);
        m.bindPopup('hello!');
        console.log('hey!')
        });
    });

  } // end renderMarkers

  getData().done(renderMarkers);



  //=========================================ADD MARKER ON CLICK & HOLD
  map.on('mousedown', function mouseState(e) {
    downTime = Date.now()
  });

  map.on('mouseup', function(e){
    upTime = Date.now();
    if ((downTime+1000) < upTime){
      console.log(downTime)
      console.log(upTime)

      var latlng = e.latlng;
      newLocation(latlng.lng, latlng.lat);
    }
    else{ console.log("click-hold not long enough")}
  });

  $('#save-marker').on('click', function(){
    console.log(downTime);
    console.log(upTime);
    $.ajax({
      url: '/bikeracks',
      type: 'post',
      dataType: 'json',
      data: {
        bikerack: {
          address: "TEST",
          neighborhood: "TEST",
          lat: latlng.lat,
          lng: latlng.lng,
          location: latlng.toString()
        }
      },
      success: function(data) {
        console.log("success!!");
        alert('location saved!');
      }
    });
  });

  //=========================================CENTER MAP ON USER LOCATION
  var geolocate = document.getElementById('geolocate');
  var locationLayer = L.mapbox.featureLayer().addTo(map);
  if (!navigator.geolocation) {
      alert('Geolocation is not available');
  } else {
      geolocate.onclick = function (e) {
          e.preventDefault();
          e.stopPropagation();
          map.locate();
      };
  }
  map.on('locationfound', function(e) {
      map.fitBounds(e.bounds);

      locationLayer.setGeoJSON({
          type: 'Feature',
          geometry: {
              type: 'Point',
              coordinates: [e.latlng.lng, e.latlng.lat],
          },
          properties: {
              'title': 'Here I am!',
              'marker-color': '#ff8888',
              'marker-symbol': 'star'
          }
      });
  });

  // If the user chooses not to allow their location
  // to be shared, display an error message.
  map.on('locationerror', function() {
      alert('Position could not be found');
  });

  //=========================================CENTERS MAP ON LOCATION SEARCH VIA FORM
  $('#search-location').on('click', function(){
    var searchLayer = L.mapbox.featureLayer().addTo(map);
    var geocoder = L.mapbox.geocoder('mapbox.places');
    var query = $("#address").val()
    console.log(query)
    geocoder.query(query, showMap);

    function showMap(err, data) {
      searchLayer.setGeoJSON({
          type: 'Feature',
          geometry: {
              type: 'Point',
              coordinates: [data.latlng[1], data.latlng[0]],
          },
          properties: {
              'title': 'Your Search',
              'marker-size': 'large',
              'marker-color': '#66ccff',
              'marker-symbol': 'embassy'
          }
      });

      if (data.lbounds) {
          map.fitBounds(data.lbounds);
      } else if (data.latlng) {
          map.setView([data.latlng[1], data.latlng[0]], 20);
      }
    }

  });


}); //end of document.ready


//creates new marker from click
function newLocation(lng, lat){
  downTime = 0;
  upTime = 0;
  newMarker = L.mapbox.featureLayer({
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates: [ lng, lat ]
    },
    properties: {
        'marker-size': 'large',
        'marker-color': '#BE9A6B',
        'marker-symbol': 'bicycle',
        'className': 'newMarker'
    },
  })
  newMarker.bindPopup('hey!').openPopup().addTo(map);

};
