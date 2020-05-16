from django.shortcuts import render
from django.http import HttpResponse
from graph.models import Graph
from django.http import JsonResponse
import json
# Create your views here.

def canvas_view(request):
    return render(request, "graph/background.xhtml")


def save_graph(request):
    structure = request.GET.dict()
    print(structure["id"])
    graph = Graph.objects.get(id=int(structure["id"]))
    with open(graph.path_to_graph, 'w') as f:
        json.dump(structure, f)
        f.close() 
    return HttpResponse()


def new_graph(request):
    graph = Graph()
    graph.save()
    path_to_graph = "graph/graphs/graph" + str(graph.id) + ".json" 
    to_json = {}
    with open(path_to_graph, 'w') as f:
        json.dump(to_json, f)
        f.close()
    graph.path_to_graph = path_to_graph
    graph.save()
    return HttpResponse(graph.id)