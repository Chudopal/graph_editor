from django.urls import path
from . import views

from django.conf.urls.static import static
from django.conf import settings


app_name = "graph"

urlpatterns = [
    path('', views.canvas_view, name="canvas_view"),
    path('SAVE_GRAPH/', views.save_graph),
    path('NEW_GRAPH/', views.new_graph),
    path('GET_GRAPH/', views.get_graph),
    path('GET_LIST_OF_GRAPHS/', views.get_list_of_graphs),
    path('IS_TREE/', views.is_tree),
    path('MAKE_TREE/', views.make_tree),
    path('MAKE_BINARY_TREE/', views.make_binary_tree),
    path('FIND_HAMILTON_CYCLE/', views.find_hamilton_cycle),
    path('FIND_DIAMETER/', views.find_diameter),
    path('FIND_RADIUS/', views.find_radius),
    path('FIND_CENTRE/', views.find_centre),
    path('VECTOR_PRODUCT/', views.vector_product),
    path('CARTESIAN_PRODUCT/', views.cartesian_product),
] + static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS)