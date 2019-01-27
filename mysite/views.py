from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import sys
import json


# Create your views here.

# def post_list(request):
#     return render(request, 'myvenv/index.html', {})

@csrf_exempt
def index(request):
    return render(request, 'index.html')

def storage(request):
    return render(request, 'dbdata.html')

@csrf_exempt
def api(request):
    if request.method == 'POST':

        user = json.loads(request.body)
        city = user['city']
        url = 'http://api.openweathermap.org/data/2.5/weather?q={}&appid=a844a051424724097641db263e8f5bc9&units=metric'.format(city)

        res = requests.get(url)
        data = res.json()

        if data['cod'] == 200:
            return JsonResponse(data, status=200)
        else:
            return JsonResponse(data, status=208)
    else:
        print('GET')
        return HttpResponse('GET')
