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
    graph_view = {
        "graph_json": graph,
        "number_of_noodes":[

        ],
        "matrix":[

        ]
    }
    print("HERE IS NAME OF VERTEX", len(graph["nodes"]))
    #return graph_view


def to_json(matrix):
    """Function for covert matrix to graph
    
    This function if getting the matrix and
    returns the json-view.
    """
    graph = {}
    return graph