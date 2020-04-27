USED = []


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
    if not current_vertex:
        global USED
        USED = [x*0 for x in range(len(incedent_matrix))]
    USED[current_vertex] = 1
    for edge_by in range(len(incedent_matrix[current_vertex])):
        if edge_by > current_vertex:
            if incedent_matrix[current_vertex][edge_by]:
                if USED[edge_by]:
                    incedent_matrix[current_vertex][edge_by] = 0;
                    incedent_matrix[edge_by][current_vertex] = 0;
                elif not USED[edge_by]:
                    make_tree(incedent_matrix, edge_by)
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
    