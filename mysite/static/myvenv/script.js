let map;

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

function takeInfo(data){


    console.log(data)

    switch (data.cod) {
        case '404':
            alert (data.message)
            break;
        default:
    }

    var temp = data.main.temp
    var cityName = data.name
    var country = data.sys.country
    var main = data.weather[0].description
    var lat = data.coord.lat
    var lon = data.coord.lon

    console.log(lat, lon)

    document.getElementById('nameCity').innerHTML = cityName + ' ' + country
    document.getElementById('tempCity').innerHTML = 'Temp: ' + temp
    document.getElementById('description').innerHTML = main

    changeCenter(lat, lon)
}
