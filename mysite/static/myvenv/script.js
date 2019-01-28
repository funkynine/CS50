// Declare variables
let map;
let date;

// Find out the date
date = new Date();

// Map initialization
function initMap() {
mapOptions = {
          zoom: 8,
          center: {lat: 50.401, lng: 30.252}
        };
    map =new google.maps.Map(document.getElementById('map'),
            mapOptions);
}

// Change center position map
function changeCenter(latitude, longitude){
  map.setCenter({lat: latitude, lng: longitude});
}

// Take the city that the user entered
function infoAboutCity() {
    cityName = document.getElementById('cityName').value
    data = {
        city: cityName,
        id: 99
    }
    addInfo(data, 'api/')
}

// Pulling data from the server
function addInfo(payload, url){
  fetch(url, {
    method: 'post',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then((res) => res.json())
  .then((data) => {
      takeInfo(data)
  })
  .catch((err) => {
      console.warn('this is error',err)
  })
}

// Just date for user
function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

// Processing data from the server
function takeInfo(data){

    // Check whether there is such a city
    switch (data.cod) {
        case '404':
            alert (data.message)
            break;
        default:
    }

    let temp = data.main.temp
    let cityName = data.name
    let country = data.sys.country
    let main = data.weather[0].description
    let lat = data.coord.lat
    let lon = data.coord.lon

    document.getElementById('nameCity').innerHTML = cityName + ' ' + country
    document.getElementById('tempCity').innerHTML = 'Temp: ' + temp
    document.getElementById('description').innerHTML = main
    document.getElementById('date').innerHTML = formatDate(new Date())

    // Change the center of the map
    changeCenter(lat, lon)
}
