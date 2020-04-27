USED = []
LEAVES = []
LONELY_VERTEXES = []

"""def make_tree(incedent_matrix):
    correct_matrix = []
    edges = 0
    numb_of_ver = len(incedent_matrix);
    for vertex in incedent_matrix:  
        for edge in vertex:
            if edge:
                edges += 1
    edges /= 2
    global USED
    USED = [x*0 for x in range(0, numb_of_ver)]
    correct_matrix = dfs(0, incedent_matrix)
    return correct_matrix


def dfs(next_vertex, incedent_matrix):
    global USED
    USED[next_vertex] = 1
    for i in range(len(incedent_matrix)):
        if incedent_matrix[next_vertex][i] == 1 and USED[i] == 1:
            incedent_matrix[next_vertex][i] = 0
            incedent_matrix[i][next_vertex] = 0
        elif incedent_matrix[next_vertex][i] == 1 and USED[i] == 0:
            dfs(i, incedent_matrix)
    return incedent_matrix
"""

def make_tree(incedent_matrix, current_vertex):
    global LEAF
    global USED
    global LONELY_VERTEXES
    numb_of_edges = 0;
    if not current_vertex:
        USED = [x*0 for x in range(len(incedent_matrix))]
    USED[current_vertex] = 1
    for edge_by in range(len(incedent_matrix[current_vertex])):
        if incedent_matrix[current_vertex][edge_by]:
            numb_of_edges +=1
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
            if lonely_vertex != len(incedent_matrix):
                incedent_matrix[lonely_vertex][lonely_vertex + 1] = 1
            if lonely_vertex != 0:
                incedent_matrix[lonely_vertex][lonely_vertex + 1] = 1

    return incedent_matrix
                        


if __name__ == "__main__":
    incedent_matrix = [
        [0, 1, 0, 1, 1],
        [1, 0, 1, 1, 0],
        [0, 1, 0, 0, 0],
        [1, 1, 0, 0, 0],
        [1, 0, 0, 0, 0],
    ]
    right_matrix = [
        [0, 1, 0, 0, 1],
        [1, 0, 1, 1, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [1, 0, 0, 0, 0],
    ]
    print(make_tree(incedent_matrix, 0))
    if right_matrix == make_tree(incedent_matrix,0):
        print("ok")
    else:
        print("no")
    
    incedent_matrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]
    right_matrix = [
        [0, 1, 0],
        [1, 0, 1],
        [0, 1, 0],
    ]
    if right_matrix == make_tree(incedent_matrix, 0):
        print("ok")
    else:
        print("no")

    incedent_matrix = [
        [0, 1, 1, 1],
        [1, 0, 1, 1],
        [1, 1, 0, 1],
        [1, 1, 1, 0],
    ]
    right_matrix = [
        [0, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
    ]
    if right_matrix == make_tree(incedent_matrix, 0):
        print("ok")
    else:
        print("no")

    incedent_matrix = [
        [0, 1, 1, 1, 1],
        [1, 0, 1, 1, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 1, 0, 1],
        [1, 1, 1, 1, 0],
    ]

    right_matrix = [
        [0, 1, 0, 0, 0],
        [1, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 1],
        [0, 0, 0, 1, 0],
    ]
    print(make_tree(incedent_matrix, 0))
    if right_matrix == make_tree(incedent_matrix,0):
        print("ok")
    else:
        print("no")
    