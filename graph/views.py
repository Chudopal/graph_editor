from django.shortcuts import render
from django.http import HttpResponse
from graph.models import OrientedGraph
from django.http import JsonResponse
# Create your views here.

def canvas_view(request):
    return render(request, "graph/background.xhtml")


def current_graph(request):
    
    print("HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    a = request.GET.dict()
    #print(a['a'])
    data = {
        "name": {
            "first_name": {
                "name":"Alex",
                "name2": "MMMM",
            },
            "last_name": "Chudopal",
        },
        "description": "Student",
    }
    return JsonResponse(data)
    
