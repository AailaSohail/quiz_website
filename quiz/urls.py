from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("make_game/<str:category>", views.make_game, name="make_game"),
    path("quiz/<str:category>", views.quiz, name="quiz"),
    path("score", views.score, name="score"),
    path("histoy", views.history, name="history"),
]