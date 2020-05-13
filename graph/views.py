from django.shortcuts import render
from django.http import HttpResponse
from graph.models import OrientedGraph
# Create your views here.

def canvas_view(request):
    return render(request, "graph/background.xhtml")


def current_graph(request):
    return HttpResponse("hello")
