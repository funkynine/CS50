// Declare variables
let map;
let date;
let testString = 'My string';

// Find out the date
date = new Date();

// Map initialization
function initMap() {
    const elem = document.getElementById('map');
    if(!elem) { return; }
mapOptions = {
          zoom: 8,
          center: {lat: 50.401, lng: 30.252}
        };
    map =new google.maps.Map(elem,
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

    // Insert data in template
    document.getElementById('nameCity').innerHTML = cityName + ' ' + country
    document.getElementById('tempCity').innerHTML = 'Temp: ' + temp
    document.getElementById('description').innerHTML = main
    document.getElementById('date').innerHTML = formatDate(new Date())

    // Change the center of the map
    changeCenter(lat, lon)
}

// Event with date 
function filterDate(city) {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    if(!startDate || !endDate) { return; }
    if (city != '0') {
        console.log(city);
        document.location = `/storage/?filter=${city}&date-start=${startDate}&date-end=${endDate}`;
    } else {
        document.location = `/storage/?date-start=${startDate}&date-end=${endDate}`;
    }
}
