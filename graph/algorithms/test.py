import networkx as nx
import numpy as np


A = np.matrix([
    [0, 1, 1],
    [0, 0, 0],
    [0, 0, 0],
    ])
G = nx.from_numpy_matrix(A,create_using=nx.MultiDiGraph())
#G.edges(data=True)
print(nx.is_tree(G))
nx.to_numpy_matrix(nx.generators.trees.random_tree(3))
#G = nx.DiGraph(U);
#print(G)
#print(nx.adjacency_matrix(G))
A = nx.to_numpy_matrix(G, nodelist=[0, 1, 2])
print(A)
print(A.tolist())