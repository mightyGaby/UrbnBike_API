var map;

$(document).ready(function(){

  console.log("map loaded!")
  L.mapbox.accessToken = 'pk.eyJ1IjoiZ2FicmllbGxlaWRhcnVpemZ1bmVzIiwiYSI6IjNjNGQ5MjM3MmMxMGI1YzNlMDJlZDZlYzA3NTc5NTJhIn0.rN0bLsGk3EFALg_1zo09eg';
  map = L.mapbox.map('map', 'mapbox.streets')
      .setView([41.893974, -87.627945], 14);
      map.zoomControl.setPosition('bottomleft');
  //
  // $.ajax({
  // dataType: 'text',
  // url: '/api/markers.json',
  // success: function(data) {
  //   var geojson;
  //   geojson = $.parseJSON(data);
  //   console.log(geojson)
  //     map.featureLayer.setGeoJSON(geojson);  }
  // });


  map.on('mousedown mouseup', function mouseState(e) {
    if (e.type == "mousedown") {
      var latlng = e.latlng;
      console.log(latlng);
      $('#map').popover('toggle');

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
    };
  });

  map.on("taphold", function(e) {
       console.log(e.containerPoint.toString() + ', ' + e.latlng.toString());
  });

  function searchLocation(){
    var geocoder = L.mapbox.geocoder('mapbox.places'), map;
    var address = document.getElementById("address").value;
    geocoder.query(address, showMap);

    function showMap(err, data) {

        if (data.lbounds) {
            map.fitBounds(data.lbounds);
        } else if (data.latlng) {
            map.setView([data.latlng[0], data.latlng[1]], 13);
        }
    }
  }
});
