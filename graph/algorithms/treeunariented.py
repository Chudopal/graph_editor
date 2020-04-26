def is_tree(incedent_matrix):
    return True

if __name__ == "__main__":
    incedent_matrix = [
        [0, 1, 0],
        [1, 0, 1],
        [0, 1, 0],
    ];
    if is_tree(incedent_matrix):
        print("ok");
    incedent_matrix = [
        [0, 1, 1, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
    ]
    if is_tree(incedent_matrix):
        print("ok");
    incedent_matrix = [
        [0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [1, 0, 1, 0, 0],
    ]
    if is_tree(incedent_matrix):
        print("No");
    incedent_matrix = [
        [0, 1, 1],
        [1, 0, 1],
        [1, 1, 0],
    ];
    if is_tree(incedent_matrix):
        print("No");