
// Initialize Leaflet map
//  nyc-map = ID of parent <div> container
//  [40.749068, -74.006712] = center of the map
//  13 = zoom level
const map = L.map('nyc-map').setView([40.749068, -74.006712], 12);

// Add Open Street Map tiles to the map
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Specify directory with leaflet images (e.g., markers)
L.Icon.Default.imagePath = 'images/';

// Add a marker (with popup) at a specific geo coordinate
const marker = L.marker([40.713008, -74.013169])
    .bindPopup('<strong>One World Trade Center</strong><br>New York City')
    .addTo(map);
