CHECK_VERTEX = 0
USED = []


def is_tree(incedent_matrix):
    global CHECK_VERTEX
    CHECK_VERTEX = 0
    edges = 0
    numb_of_ver = len(incedent_matrix);
    for vertex in incedent_matrix:  
        for edge in vertex:
            if edge:
                edges += 1
    global USED
    USED = [x*0 for x in range(0, numb_of_ver)]
    dfs(0, incedent_matrix)

    if edges == numb_of_ver - 1 and CHECK_VERTEX == numb_of_ver:
        return True
    else:
        return False


def dfs(next_vertex, incedent_matrix):
    USED[next_vertex] = 1
    global CHECK_VERTEX
    CHECK_VERTEX += 1
    for i in range(len(incedent_matrix)):
        if incedent_matrix[next_vertex][i] == 1 and USED[i] == 0:
            dfs(i, incedent_matrix)


if __name__ == "__main__":
    incedent_matrix = [
        [0, 1, 0],
        [0, 0, 1],
        [0, 0, 0],
    ];
    if is_tree(incedent_matrix):
        print("ok")
    else:
        print("no")
    incedent_matrix = [
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ]
    if is_tree(incedent_matrix):
        print("ok")
    else:
        print("no")
    incedent_matrix = [
        [0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 1, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 1, 0, 0],
    ]
    if is_tree(incedent_matrix):
        print("no")
    else:
        print("ok")
    incedent_matrix = [
        [0, 1, 0],
        [1, 0, 1],
        [1, 1, 0],
    ];
    if is_tree(incedent_matrix):
        print("no")
    else:
        print("ok")