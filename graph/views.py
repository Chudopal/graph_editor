from django.shortcuts import render
from django.http import HttpResponse
from graph.models import Graph
from django.http import JsonResponse
from . import convertation as cn
import json

# Create your views here.

def canvas_view(request):
    """Function for main view

    This function is building the canvas and
    all, what the user can see.
    """
    return render(request, "graph/background.xhtml")


def new_graph(request):
    """Function for creating new graph

    This function allows to ceating a new record
    in the database.
    """
    graph = Graph(name="new graph")
    graph.save()
    path_to_graph = "graph/graphs/graph" + str(graph.id) + ".json" 
    to_json = {}
    with open(path_to_graph, 'w') as f:
        f.write(json.dumps(to_json))
        f.close()
    graph.path_to_graph = path_to_graph
    graph.save()
    return HttpResponse(graph.id)


def save_graph(request):
    """Function for saving graph

    This function allows to save 
    graph into server.
    """
    structure = request.GET.dict()
    graph = Graph.objects.get(id=int(structure["id"]))
    graph.name = structure["name"]
    with open(graph.path_to_graph, 'w') as f:
        json.dump(structure, f)
        f.close() 
    graph.save()
    return HttpResponse()


def get_graph(request):
    """Function for getting graph

    This function allows to get the 
    current graph from server.
    """
    id_of_graph = request.GET.dict()["id"]
    graph = Graph.objects.get(id=int(id_of_graph))
    path_to_graph = graph.path_to_graph
    data = {}
    with open(graph.path_to_graph) as file:
        data = json.load(file)
    return JsonResponse(data)


def get_list_of_graphs(request):
    """Function for getting a list of all graphs

    This function return list of graphs, which is in server.
    """
    graphs = list(Graph.objects.values())
    names = []
    for graph in graphs:
        data_graph ={
            "name": graph["name"],
            "id": graph["id"],
        }
        names.append(data_graph)
    data ={
        "names": names
    }
    return JsonResponse(data)


def is_tree(request):
    """Function for determination is graph tree or no

    This function is getting a graph and response:
    "1" -- it is a tree,
    "0" -- it is not a tree.
    """
    graph = request.GET.dict()
    print(graph)
    cn.to_matrix(json.loads(graph["graph"]))
    pass


def make_tree(request):
    """Function for making a tree

    This function is getting a graph,
    and returns a tree or "0".
    """
    pass


def make_binary_tree(request):
    """Function for making a binary tree

    This function is getting a graph,
    and returns a binary tree or "0".
    """
    pass


def find_hamilton_cycle(request):
    """Function for finding a Hamilton cycle

    This function is getting a graph and returns 
    his Hamelton cycle or "0".
    """
    pass


def find_diameter(request):
    """Function for find a diameter of a graph

    This function is getting a graph and returns 
    his diameter or "0".
    """
    pass


def find_radius(request):
    """Function for find a radius of a graph

    This function is getting a graph and returns 
    his radius or "0".
    """
    pass


def find_centre():
    """Function for find a centre of a graph

    This function is getting a graph and returns 
    his centre or "0".
    """
    pass


def vector_product():
    """Funstion for calculating a vector product of 2 graphs

    This function is getting 2 graphs and return their vector
    product
    """
    pass


def cartesian_product():
    """Funstion for calculating a cartesian product of 2 graphs

    This function is getting 2 graphs and return their cartesian
    product
    """
    pass