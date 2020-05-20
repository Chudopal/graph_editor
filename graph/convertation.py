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


def to_json(matrix):
    """Function for covert matrix to graph
    
    This function if getting the matrix and
    returns the json-view.
    """
    graph = {}
    return graph