import math
import networkx as nx
import random


def to_matrix(graph):
    """Function for convert graph to matrix

    This function is getting the json-data
    and return list of lists like:
    [
        [0, 1, 1],
        [0, 0, 1],
        [0, 1, 0],
    ].
    """
    graph_names = [node["name"] for node in graph["nodes"]]
    numb_of_nodes = len(graph_names)
    matrix = [[0] * numb_of_nodes for i in range(0, numb_of_nodes)]
    for edge in graph["edges"]:
        first_node = graph_names.index(edge["firstNode"])
        second_node = graph_names.index(edge["secondNode"])
        matrix[first_node][second_node] = 1
    return matrix


def to_json(matrix, graph_data):
    """Function for covert matrix to graph
    
    This function if getting the matrix and
    returns the json-view.
    """
    if len(matrix) > len(graph_data["nodes"]):
        for node_numb in range(len(graph_data["nodes"]), len(matrix)):
            node = {
                "name": "vertex" + str(node_numb),
                "color": "#F5A9A9",
                "figure": "ball",
                'x':random.randint(100, 990),
                'y':random.randint(50, 790)
            }
            graph_data["nodes"].append(node)
    print("DDDDDDDAAAAAA",graph_data)
    for node_numb in range(0, len(matrix)):
        for edge_numb in range(0, len(matrix[node_numb])):
            print(matrix[node_numb][edge_numb])
            if matrix[node_numb][edge_numb]:
                first_node = graph_data["nodes"][node_numb]
                second_node = graph_data["nodes"][edge_numb]
                edge_exists = False
                for edge in graph_data["edges"]:
                    if (edge["firstNode"] == first_node["name"] and
                        edge["secondNode"] == second_node["name"]):
                        edge_exists = True
                if not edge_exists:
                    if graph_data["oriented"]:
                        edge = create_dir_edge(first_node, second_node)
                        graph_data["edges"].append(edge)
                    else:
                        edge = create_undir_edge(first_node, second_node)
                        graph_data["edges"].append(edge)
            else:
                first_node = graph_data["nodes"][node_numb]
                second_node = graph_data["nodes"][edge_numb]
                for edge in graph_data["edges"]:
                    if (edge["firstNode"] == first_node["name"] and
                        edge["secondNode"] == second_node["name"]):
                        edge_numb = graph_data["edges"].index(edge)
                        del graph_data["edges"][edge_numb]
    graph_data = make_dir(graph_data)
    return graph_data




def create_dir_edge(first_node, second_node):
    beginX = first_node['x']
    beginY = first_node['y']
    endX = second_node['x']
    endY = second_node['y']
    r = 10
    tgOfNearAngle = ((beginY - endY) /
        (beginX - endX))
    tgOfAngle = math.tan(math.pi/2 - math.atan(tgOfNearAngle))
    xDelta = (r-5) / math.sqrt(tgOfAngle*tgOfAngle + 1)
    yDelta = xDelta*tgOfAngle
    edge = {
        "firstNode": first_node["name"],
        "secondNode": second_node["name"],
        'color': "#F2F5A9",
        'isArc': False,
        'coords': ("M" + " " +
          str(beginX + xDelta) + " " +
          str(beginY - yDelta) + " " +
          "Q" + " " +
          str(beginX + xDelta) + " " +
          str(beginY - yDelta) + " " +
          str(endX) + " " +
          str(endY) + " " +
          "Q" + " " +
          str(endX) + " " +
          str(endY) + " " +
          str(beginX - xDelta) + " " +
          str(beginY + yDelta) + " " +
          "Z"),
        'bisieX':0,
        'bisieY':0
    }
    return edge


def create_undir_edge(first_node, second_node):
    beginX = first_node['x']
    beginY = first_node['y']
    endX = second_node['x']
    endY = second_node['y']
    r = 10
    tgOfNearAngle = ((beginY - endY) /
        (beginX - endX))
    tgOfAngle = math.tan(math.pi/2 - math.atan(tgOfNearAngle))
    xDelta = (r-5) / math.sqrt(tgOfAngle*tgOfAngle + 1)
    yDelta = xDelta*tgOfAngle
    edge = {
        "firstNode": first_node["name"],
        "secondNode": second_node["name"],
        'color': "#F2F5A9",
        'isArc': False,
        'coords': ("M" + " " +
          str(beginX + xDelta) + " " +
          str(beginY - yDelta) + " " +
          "Q" + " " +
          str(beginX + xDelta) + " " +
          str(beginY - yDelta) + " " +
          str(endX + xDelta) + " " +
          str(endY - yDelta) + " " +
          "L" + " " +
          str(endX - xDelta) + " " +
          str(endY + yDelta) + " " +
          "Q" + " " +
          str(endX) + " " +
          str(endY) + " " +
          str(beginX - xDelta) + " " +
          str(beginY + yDelta) + " " +
          "Z"),
        'bisieX':0,
        'bisieY':0
    }
    return edge


def make_dir(graph_data):
    for edge in graph_data["edges"]:
        for revers_edge in graph_data["edges"]:
            if(edge["firstNode"] == revers_edge["secondNode"] and
            edge["secondNode"] == revers_edge["firstNode"]):
                edge_numb = graph_data["edges"].index(revers_edge)
                del graph_data["edges"][edge_numb]
    return graph_data


def make_binary_tree(numb_of_nodes):
    matrix = [[0] * numb_of_nodes for i in range(0, numb_of_nodes)]
    size = numb_of_nodes/2
    for node_numb in range(0, int(size)):
        matrix[node_numb][node_numb*2+1] = 1
        if (node_numb*2+1) != (len(matrix)-1) :
            matrix[node_numb][node_numb*2+2] = 1
    return matrix


def hamilton(G):
    F = [(G,[list(G.nodes())[0]])]
    n = G.number_of_nodes()
    while F:
        graph,path = F.pop()
        confs = []
        for node in graph.neighbors(path[-1]):
            conf_p = path[:]
            conf_p.append(node)
            conf_g = nx.Graph(graph)
            conf_g.remove_node(path[-1])
            confs.append((conf_g,conf_p))
        for g,p in confs:
            if len(p)==n:
                return make_matrix_from_list(p)
            else:
                F.append((g,p))
    return None


def make_matrix_from_list(list_of_nodes):
    numb_of_nodes = len(list_of_nodes)
    matrix = [[0] * numb_of_nodes for i in range(0, numb_of_nodes)]
    for node in range(0, len(list_of_nodes)):
        if node < len(matrix) - 1:
            matrix[list_of_nodes[node]][list_of_nodes[node+1]] = 1
        else:
            matrix[list_of_nodes[node]][0] = 1  
    return matrix