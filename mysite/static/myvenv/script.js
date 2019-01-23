

function infoAboutCity(event) {
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
    document.getElementById('cityName').value = data.data
}
