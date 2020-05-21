import networkx as nx
import numpy as np


print(nx.to_numpy_matrix(nx.DiGraph(nx.to_numpy_matrix(nx.generators.trees.random_tree(3)))))