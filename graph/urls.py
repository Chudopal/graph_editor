from django.urls import path
from . import views

from django.conf.urls.static import static
from django.conf import settings


app_name = "graph"

urlpatterns = [
    path('', views.canvas_view, name="canvas_view"),
    path('API/', views.current_graph),
] + static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS)