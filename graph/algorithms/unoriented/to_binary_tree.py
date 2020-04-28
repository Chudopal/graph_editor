USED = []


def added_vertex(incedent_matrix, vertex):
    pass


def delete_vertex(incedent_matrix):
    pass


def make(incedent_matrix):
    pass


if __name__ == "__main__":
    incedent_matrix = [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
    ]
    right_matrix = [
        [0, 1, 1, 0, 0],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
    ]
    if right_matrix == make(incedent_matrix):
        print("ok")

    incedent_matrix = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ]
    right_matrix = [
        [0, 1, 1, 0, 0],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
    ]

    if right_matrix == make(incedent_matrix):
        print("ok")

    incedent_matrix = [
        [0, 1, 1, 0, 0],
        [1, 0, 1, 0, 0],
        [1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 1, 0],
    ]
    right_matrix = [
        [0, 1, 1, 0, 0],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
    ]

    if right_matrix == make(incedent_matrix):
        print("ok")

    incedent_matrix = [
        [0, 1, 0],
        [1, 0, 0],
        [0, 0, 0],
    ]
    right_matrix = [
        [0, 1, 1],
        [1, 0, 0],
        [1, 0, 0],
    ]

    if right_matrix == make(incedent_matrix):
        print("ok")
