
/* A Document Ready in jQuery above */

/* Adapted from Ian Wright of Wrights HQ Placing multiple markers on a Google Map (Using API 3) 30 MAY 2016
* We are displaying multiple markers on the map, with each marker being clickable to display the info window.
*/
// jQuery(function($) {
//     // Asynchronously Load the map API
//     var script = document.createElement('script');
//     script.src = "//maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
//     document.body.appendChild(script);
// });

// Global variables
var gantries
var charges

// InitMap function
function initMap() {
    var map;
    var markers = [];
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);

    // create multiple markers
    for (var i = 0; i < gantries.length; i++) {
      // array with [id, long, lat]
      var gantryItem = [gantries[i].gantryID, gantries[i].location.latitude, gantries[i].location.longitude]
      console.log(gantryItem)
      markers.push(gantryItem)
    }

    // Info Window Content
    var infoWindowContent = [];
    console.log('before for loop, gantries', gantries)
    for (var i = 0; i < gantries.length; i++) {
      //console.log(gantries)
      infoWindowContent.push(['<div class="info_content">' +
        '<h3>' + gantries[i].gantryID + '</h3>' +
        '<h4>' + gantries[i].locationDescription + '</h4>']
      );
    };

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;

    // Loop through our array of markers & place each one on the map
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });

        // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });

}

$(() => {
  $.ajax({
    method: 'GET',
    url: '/charges',
    success: (result) => {
      charges = result
      console.log('ALL CHARGES ARE HERE:', charges)
    }
  }).done(() => {
      console.log('ajax charges done')
    }
  )
})

$(() => {
  $.ajax({
    method: 'GET',
    url: '/gantry',
    success: (result) => {
      gantries = result
      //console.log('ALL GANTRIES ARE HERE:', gantries)
    }
  }).done(() => {
      console.log('ajax gantries done')
      initMap()
    }
  )
})
