USED = []


def new_matrix():
    global USED
    USED = []

def delete_vertex(incedent_matrix, current_vertex):
    global USED
    numb_of_edges = 0;
    if not current_vertex:
        USED = [x*0 for x in range(len(incedent_matrix))]
    USED[current_vertex] = 1
    for edge_by in range(len(incedent_matrix[current_vertex])):
        if incedent_matrix[current_vertex][edge_by]:
            numb_of_edges += 1
            if USED[edge_by]:
                incedent_matrix[current_vertex][edge_by] = 0;
            else:
                make_tree(incedent_matrix, edge_by)
    return incedent_matrix

def create_vertex(incedent_matrix):
    for used in range(len(USED)):
        if not USED[used]:
            incedent_matrix[0][used] = 1
    return incedent_matrix


def make(incedent_matrix):
    new_matrix()

    incedent_matrix = delete_vertex(incedent_matrix, 0)
    incedent_matrix = create_vertex(incedent_matrix)
    new_matrix()
    incedent_matrix = delete_vertex(incedent_matrix, 0)
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
        [0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ]
    if right_matrix == make(incedent_matrix):
        print("ok")
    else:
        print("no")
    incedent_matrix = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
    ]
    right_matrix = [
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0],
    ]
    if right_matrix == make(incedent_matrix):
        print("ok")
    else:
        print("no")
    incedent_matrix = [
        [0, 1, 1, 0],
        [0, 0, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 1, 0],
    ]
    right_matrix = [
        [0, 1, 0, 0],
        [0, 0, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]

    if right_matrix == make(incedent_matrix):
        print("ok")
    else:
        print("no")
    incedent_matrix = [
        [0, 1, 1, 1, 0],
        [0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
    ]

    right_matrix = [
        [0, 1, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
    ]

    if right_matrix == make(incedent_matrix):
        print("ok")
    else:
        print("no")
    incedent_matrix = [
        [0, 1, 1],
        [0, 0, 1],
        [0, 0, 0],
    ]
    right_matrix = [
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0],
    ]
    if right_matrix == make(incedent_matrix):
        print("ok")
    else:
        print("no")
