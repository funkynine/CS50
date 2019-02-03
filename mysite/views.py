from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import sys
import json
import datetime
import sqlite3
import os.path


# Connect file DB
SQLITE_FILE = 'dbsite.db'

# Create your views here.

# Main render index HTML file
@csrf_exempt
def index(request):
    return render(request, 'index.html')

# Out put data in table
@csrf_exempt
def storage(request):
    decr = 0
    # Check if there is a file in the directory
    if os.path.exists(SQLITE_FILE):
        print('DataBase file find')
    else:
        print('File NOT exists')

    # Connect DataBase
    conn = sqlite3.connect(SQLITE_FILE)
    # Create cursor
    db = conn.cursor()

    db.execute('SELECT count(*) FROM CITYS')
    count = ((db.fetchone()[0] + 1) // 5) + 1
    # Request to database
    page = 0
    if (request.GET.get('page')):
        decr = int(request.GET.get('page')) - 1
        page = decr * 4

    db.execute('SELECT * FROM CITYS LIMIT 5 OFFSET ?', (page,))

    # Assignment of data from the database
    result = db.fetchall()
    # Record changes and close the connection
    conn.commit()
    conn.close()
    # Create dict
    result = {"result": result}
    result["count"] = count
    result["previousPage"] = decr

    if(count != decr + 1):
        result["nextPage"] = decr + 2

    return render(request, 'dbdata.html', context=result)

# Url take data API and connect sqlite database
@csrf_exempt
def api(request):
    if request.method == 'POST':

        # Take user input data
        user = json.loads(request.body)
        city = user['city']

        # Connect API
        url = 'http://api.openweathermap.org/data/2.5/weather?q={}&appid=a844a051424724097641db263e8f5bc9&units=metric'.format(city)

        # Check if there is a file in the directory
        if os.path.exists(SQLITE_FILE):
            print('DataBase file find')
        else:
            print('File NOT exists')

        # Connect DataBase
        conn = sqlite3.connect(SQLITE_FILE)
        # Create cursor
        db = conn.cursor()

        # Accept data from js
        res = requests.get(url)
        data = res.json()

        # Check status code
        if data['cod'] == 200:

            # Take data from json
            name = data['name']
            temp = int(data['main']['temp'])
            description = data['weather'][0]['description']

            # Date for DB in string
            now = datetime.datetime.now()
            date = now.strftime("%B %d, %Y")

            params = (name, temp, description, date)

            # Insert the data in the table
            db.execute('''INSERT INTO CITYS (name, temp, description, date) VALUES(?, ?, ?, ?)''', params)

            conn.commit()
            conn.close()
            return JsonResponse(data, status=200)
        else:
            return JsonResponse(data, status=208)
    else:
        print('GET')
        return HttpResponse('GET')
