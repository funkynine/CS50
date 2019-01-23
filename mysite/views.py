from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import sys
import json

# Create your views here.

# def post_list(request):
#     return render(request, 'myvenv/index.html', {})


def index(request):
    return render(request, 'index.html')

def test(request):
    return HttpResponse("Hi World")

@csrf_exempt
def api(request):
    if request.method == 'POST':
        user = json.loads(request.body)
        city = user['city']
        url = 'http://api.openweathermap.org/data/2.5/weather?q={}&appid=a844a051424724097641db263e8f5bc9&units=metric'.format(city)

        res = requests.get(url)
        data = res.json()

        if data['cod'] == 200:
            temp = data['main']['temp']
            cityName = data['name']
            country = data['sys']['country']
            lat, lon = data['coord']['lat'], data['coord']['lon']
            return JsonResponse({'data': temp}, status=200)
        else:
            print(data['message'])
            return JsonResponse({'data':data['message']}, status=208)
    else:
        print('GET')
        return HttpResponse('GET')
#
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
