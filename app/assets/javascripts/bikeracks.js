var map;

$(document).ready(function(){

  //creates new map
  console.log("map loaded!")
  L.mapbox.accessToken = 'pk.eyJ1IjoiZ2FicmllbGxlaWRhcnVpemZ1bmVzIiwiYSI6IjNjNGQ5MjM3MmMxMGI1YzNlMDJlZDZlYzA3NTc5NTJhIn0.rN0bLsGk3EFALg_1zo09eg';
  map = L.mapbox.map('map', 'mapbox.streets')
      .setView([41.893974, -87.627945], 14);
      map.zoomControl.setPosition('bottomleft');

  //loads markers from database
  // $.ajax({
  // dataType: 'text',
  // url: '/api/markers.json',
  // success: function(data) {
  //   var geojson;
  //   geojson = $.parseJSON(data);
  //   console.log(geojson)
  //     map.featureLayer.setGeoJSON(geojson);  }
  // });

  //centers on users's location
  var geolocate = document.getElementById('geolocate');
  var myLayer = L.mapbox.featureLayer().addTo(map);
  if (!navigator.geolocation) {
      alert('Geolocation is not available');
  } else {
      geolocate.onclick = function (e) {
          e.preventDefault();
          e.stopPropagation();
          map.locate();
      };
  }

  // Once we've got a position, zoom and center the map
  // on it, and add a single marker.
  map.on('locationfound', function(e) {
      map.fitBounds(e.bounds);

      myLayer.setGeoJSON({
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

  var downTime;
  map.on('mousedown', function mouseState(e) {
    downTime = Date.now()
  });

  map.on('mouseup', function(e){

    var upTime = Date.now();
    if ((downTime+500) < upTime){
      console.log(downTime)
      console.log(upTime)

      var latlng = e.latlng;
      newLocation(latlng.lng, latlng.lat);
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
        }
      });

    }

  })

  // RETURNS COORDINATES FROM LOCATION SEARCH VIA FORM
  $('#search-location').on('click', function(){
    var geocoder = L.mapbox.geocoder('mapbox.places');
    var query = $("#address").val()
    console.log(query)
    geocoder.query(query, showMap);

    function showMap(err, data) {
        // The geocoder can return an area, like a city, or a
        // point, like an address. Here we handle both cases,
        // by fitting the map bounds to an area or zooming to a point.
        if (data.lbounds) {
            map.fitBounds(data.lbounds);
        } else if (data.latlng) {
            map.setView([data.latlng[0], data.latlng[1]], 25);
        }
    }
  });

}); //end of document.ready


//creates new marker from click
function newLocation(lng, lat){
  L.mapbox.featureLayer({
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates: [
          lng,
          lat
        ]
    },
    properties: {
        'marker-size': 'large',
        'marker-color': '#BE9A6B',
        'marker-symbol': 'bicycle'
    }
  }).addTo(map);
};
