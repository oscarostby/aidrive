var map;
var recyclingStations = [
  { position: [59.911526, 10.767422], title: "Oslo" },
  { position: [60.374149, 5.353328], title: "Bergen" },
  { position: [63.426398, 10.387183], title: "Trondheim" },
  { position: [58.965314, 5.727665], title: "Stavanger" },
  { position: [59.737011, 10.203453], title: "Drammen" }
];

function initMap() {
  map = L.map("map").setView([40.7128, -74.0060], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  console.log("Adding recycling station markers...");
  recyclingStations.forEach(function (station) {
    L.marker(station.position).addTo(map).bindPopup(station.title);
  });
}

function getUserLocation() {
  if (navigator.geolocation) {
    console.log("Requesting user location...");
    navigator.geolocation.getCurrentPosition(showClosestStation);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showClosestStation(position) {
  console.log("User location received:", position);

  // Get the user's latitude and longitude
  var userLat = position.coords.latitude;
  var userLng = position.coords.longitude;

  // Create a marker for the user's location
  var userMarker = L.marker([userLat, userLng]).addTo(map);

  // Center the map on the user's location
  map.setView([userLat, userLng], 14);

  // Find the closest recycling station and display a popup with its name, distance, and travel time
  var closestStation = getClosestStation(userLat, userLng);
  var distance = getDistance(userLat, userLng, closestStation.position[0], closestStation.position[1]);
  var url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62481d490873932e4b37a5094a078bb25d51&start=${userLng},${userLat}&end=${closestStation.position[1]},${closestStation.position[0]}&units=km&instructions=false&format=geojson&geometry=true&geometry_format=geojson&language=en`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var duration = data.features[0].properties.segments[0].duration / 60;
      var popupContent = closestStation.title + "<br>" + "Distance: " + distance.toFixed(2) + " km" + "<br>" + "Travel time: " + duration.toFixed(0) + " minutes";
      L.popup()
        .setLatLng(closestStation.position)
        .setContent(popupContent)
        .openOn(map);

      // Draw the driving route on the map
      var route = L.geoJSON(data.features[0].geometry).addTo(map);
    });
}


  

function getClosestStation(userLat, userLng) {
  var closestStation = null;
  var closestDistance = Infinity;

  recyclingStations.forEach(function (station) {
    var distance = getDistance(userLat, userLng, station.position[0], station.position[1]);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestStation = station;
    }
  });

  return closestStation;
}

function getDistance(lat1, lon1, lat2, lon2) {
  var R = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

document.addEventListener("DOMContentLoaded", initMap);
window.addEventListener("load", function () {
  document.querySelector(".cta-button").addEventListener("click", getUserLocation);
});
