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
    print(incedent_matrix[current_vertex])
    for edge_by in range(len(incedent_matrix[current_vertex])):
        if incedent_matrix[current_vertex][edge_by]:
            numb_of_edges += 1
            if USED[edge_by]:
                print("hello world")
                incedent_matrix[current_vertex][edge_by] = 0;
            else:
                make_tree(incedent_matrix, edge_by)
    return incedent_matrix

def tree(incedent_matrix):
    new_matrix()
    incedent_matrix = make_tree(incedent_matrix, 0)
    print(USED)
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
    #    print(tree(incedent_matrix))
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
    #print("HERE",tree(incedent_matrix))
    if right_matrix == tree(incedent_matrix):
        print("ok")
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
    #    print(tree(incedent_matrix))
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
        #print(tree(incedent_matrix))
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
    print("//////////////////////////")
    print(tree(incedent_matrix))
    #    print(tree(incedent_matrix))
