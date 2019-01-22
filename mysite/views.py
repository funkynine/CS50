from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

# def post_list(request):
#     return render(request, 'myvenv/index.html', {})


def index(request):
    return render(request, 'index.html')

def test(request):
    return HttpResponse("Hi World")
