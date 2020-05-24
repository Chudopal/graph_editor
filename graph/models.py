from django.db import models
import json

# Create your models here.


class Graph(models.Model):
    name = models.CharField(max_length=250)
    path_to_graph = models.CharField(max_length=250)