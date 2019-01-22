var map;
var lat;
var lng;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.230076, lng: 28.464917},
        zoom: 8
    });
}
