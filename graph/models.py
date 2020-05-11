from django.db import models
import json

# Create your models here.

class OrientedGraph():
    
    name = ""
    description = ""
    graph_structure = {

        "vertexes":[
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
                "vertex1":"vertex2",
                "color": "#bruh",
                "besie":"d12 23 m23 34"
            },
            {
                "vertex2":"vertex1",
                "color": "#bruh",
                "besie":"d12 23 m23 34"
            },
        ],
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