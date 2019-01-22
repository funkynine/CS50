import requests
from pprint import pprint

city = 'Kiev'

url = 'http://api.openweathermap.org/data/2.5/weather?q={}&appid=a844a051424724097641db263e8f5bc9&units=metric'.format(city)

res = requests.get(url)

data = res.json()

temp = data['main']['temp']
cityName = data['name']
country = data['sys']['country']
lat, lon = data['coord']['lat'], data['coord']['lon']


pprint(data)

print("Temp: {0}, Name: {1}, {2}".format(temp, cityName, country))

def dataAboutCity(city):

    url = 'http://api.openweathermap.org/data/2.5/weather?q={}&appid=a844a051424724097641db263e8f5bc9&units=metric'.format(city)

    res = request.get(url)
    data = res.json()

    temp = data['main']['temp']
    cityName = data['name']
    country = data['sys']['country']
    description = data['weather']['description']
    lat, lon = data['coord']['lat'], data['coord']['lon']
