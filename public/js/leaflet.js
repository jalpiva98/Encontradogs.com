const coordinates = "";
const locationText = document.querySelector('#location-new-pet-post');
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




const popup = L.popup();
function onMapClick(e) {

const coordinates  = e.latlng.toString();
locationText.value= coordinates.slice(7,25);
console.log(locationText);  
popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map); 
}

map.on('click', onMapClick);


getApi();



function drawMap(title,lat,long,img){
    const dogIcon = new LeafIcon({iconUrl: img});
    const mGreen = L.marker([lat , long], {icon: dogIcon}).bindPopup(title).addTo(map);
}

function getApi() {
    var requestUrl = '/dogsData';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        for (let i = 0; i < 300; i++) {
            const title = data[i].title;
            const location = data[i].location.split(",");
            const lat = location[0];
            const long = location[1];
            const img = data[i].imageUrl;
            drawMap(title,lat,long,img);
        }
      });
  }