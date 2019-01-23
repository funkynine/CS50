import requests
from pprint import pprint

# city = 'Kiev'
#
# url = 'http://api.openweathermap.org/data/2.5/weather?q={}&appid=a844a051424724097641db263e8f5bc9&units=metric'.format(city)
#
# res = requests.get(url)
#
# data = res.json()
#
# if data['cod'] == 200:
#     print('good')
# else:
#     print(data['message'])






# print("Temp: {0}, Name: {1}, {2}".format(temp, cityName, country))

def dataAboutCity(x):

    city = x
    url = 'http://api.openweathermap.org/data/2.5/weather?q={}&appid=a844a051424724097641db263e8f5bc9&units=metric'.format(city)

    res = requests.get(url)
    data = res.json()

    if data['cod'] == 200:
        temp = data['main']['temp']
        cityName = data['name']
        country = data['sys']['country']
        lat, lon = data['coord']['lat'], data['coord']['lon']
        print("Temp: {0}, Name: {1}, {2}".format(temp, cityName, country))
    else:
        print(data['message'])


dataAboutCity('London')
