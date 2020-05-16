from django.db import models
import json

# Create your models here.


class Graph(models.Model):
    name = models.CharField(max_length=250)
    path_to_graph = models.CharField(max_length=250)


"""class OrientedGraph():
    
    name = ""
    description = ""
    graph_structure = {

        "nodes":[
            {
                "name":"vertex1",
                "color" : "#qwer",
                "figure": "polygon",
                "x":123,
                "y":123,
            },
            {
                "name":"vertex1",
                "color" : "#qwer",
                "figure": "ball",
                "x":223,
                "y":223,
            },
        ],
        "edges":[
            {
                "firstNode": "vertex1",
                "secondNode":"vertex2",
                "color": "#bruh",
                "coords":"d12 23 m23 34"
            },
        ],
        "oriented": False,
    }

    def __init__(self, description, name):
        self.description = description
        self.name = name

    def getGraph(self):
        return [self.name, self.description, self.graph_structure]

    


class UnorientedGraph():

    def __init__(self, description, name):
        self.description = description
        self.name = name
    

if __name__ == "__main__":
    graph1 = OrientedGraph("description", "name")
    #print(graph1.getGraph())
    with open('sw_templates.json', 'w') as f:
        print("here")
        json.dump(graph1.getGraph(), f)
"""