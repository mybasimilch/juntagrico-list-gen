from django.urls import path

from juntagrico_list_gen import views

urlpatterns = [
    path('lg/listgen/', views.generate_lists, name='lg-list_gen'),
    path('lg/gendate/', views.fetch_list_generation_date, name='lg-list_gen_date'),
]
