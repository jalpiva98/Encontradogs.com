const map = L.map('map').setView([20.642987904855, -100.44886813038642], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: './public/assets/dog.png',
        iconSize:     [90, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
});

const dogIcon = new LeafIcon({iconUrl: 'https://www.pngkit.com/png/detail/950-9507730_635px-circle-dog-catches-something.png'});
for (let i = 0; i < 300; i++) {
console.log(dogIcon);
const mGreen = L.marker([20.59552859795402+Math.sin(i) * -i, -100.424802006007859+i], {icon: dogIcon}).bindPopup('I am a green leaf.').addTo(map);
} 
const popup = L.popup();
function onMapClick(e) {
popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

map.on('click', onMapClick);