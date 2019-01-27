let map;
let date;

date = new Date();

function initMap() {
mapOptions = {
          zoom: 8,
          center: {lat: 50.401, lng: 30.252}
        };
    map =new google.maps.Map(document.getElementById('map'),
            mapOptions);
}

function changeCenter(latitude, longitude){
  map.setCenter({lat: latitude, lng: longitude});
}

function infoAboutCity() {
    cityName = document.getElementById('cityName').value
    data = {
        city: cityName,
        id: 99
    }
    addInfo(data, 'api/')
}

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

function takeInfo(data){


    console.log(data)

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

    changeCenter(lat, lon)
}
