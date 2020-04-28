USED = []
LEAVES = []
LONELY_VERTEXES = []


def new_matrix():
    global USED
    global LEAVES
    global LONELY_VERTEXES
    USED = []
    LEAVES = []
    LONELY_VERTEXES = []


def make_tree(incedent_matrix, current_vertex):
    global LEAVES
    global USED
    global LONELY_VERTEXES
    numb_of_edges = 0;
    if not current_vertex:
        USED = [x*0 for x in range(len(incedent_matrix))]
    USED[current_vertex] = 1
    for edge_by in range(len(incedent_matrix[current_vertex])):
        if incedent_matrix[current_vertex][edge_by]:
            numb_of_edges += 1
        if edge_by > current_vertex:
            if incedent_matrix[current_vertex][edge_by]:
                if USED[edge_by]:
                    incedent_matrix[current_vertex][edge_by] = 0;
                    incedent_matrix[edge_by][current_vertex] = 0;
                elif not USED[edge_by]:
                    make_tree(incedent_matrix, edge_by)
    if numb_of_edges == 1:
        LEAVES.append(current_vertex)
    if numb_of_edges == 0:
        LONELY_VERTEXES.append(current_vertex)
    if not LEAVES:
        for lonely_vertex in LONELY_VERTEXES:
            if lonely_vertex != len(incedent_matrix) -1:
                incedent_matrix[lonely_vertex][lonely_vertex + 1] = 1
            if lonely_vertex != 0:
                incedent_matrix[lonely_vertex][lonely_vertex - 1] = 1
    else:
        for lonely_vertex in LONELY_VERTEXES:
            incedent_matrix[LEAVES[0]][lonely_vertex] = 1
            incedent_matrix[lonely_vertex][LEAVES[0]] = 1
    return incedent_matrix

def tree(incedent_matrix):
    new_matrix()
    incedent_matrix = make_tree(incedent_matrix, 0)
    for vertex in range(len(USED)):
        if not USED[vertex]:
            incedent_matrix = make_tree(incedent_matrix, vertex)
    return incedent_matrix

if __name__ == "__main__":

    incedent_matrix = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ]
    right_matrix = [
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
    ]
    if right_matrix == tree(incedent_matrix):
        print("ok")
    else:
        print("no")
        print(tree(incedent_matrix))
    new_matrix()
    incedent_matrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]
    #print(make_tree(incedent_matrix, 0))
    right_matrix = [
        [0, 1, 1],
        [0, 0, 0],
        [0, 0, 0],
    ]
    if right_matrix == tree(incedent_matrix):
        print("ok")
        print(tree(incedent_matrix))
    else:
        print("no")
    new_matrix()
    incedent_matrix = [
        [0, 1, 1, 0],
        [0, 0, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 1, 0],
    ]
    right_matrix = [
        [0, 1, 1, 0],
        [0, 0, 0, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]

    if right_matrix == tree(incedent_matrix):
        print("ok")
    else:
        print("no")
        print(tree(incedent_matrix))
    new_matrix()
    incedent_matrix = [
        [0, 1, 1, 1, 0],
        [0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
    ]

    right_matrix = [
        [0, 1, 1, 0, 0],
        [0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ]
    #print(make_tree(incedent_matrix, 0))
    if right_matrix == tree(incedent_matrix):
        print("ok")
    else:
        print("no")
        print(tree(incedent_matrix))
    incedent_matrix = [
        [0, 1, 1],
        [0, 0, 1],
        [0, 0, 0],
    ]
    #print(make_tree(incedent_matrix, 0))
    right_matrix = [
        [0, 1, 1],
        [0, 0, 0],
        [0, 0, 0],
    ]
    if right_matrix == tree(incedent_matrix):
        print("ok")
        print(tree(incedent_matrix))
