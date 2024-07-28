from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.db import IntegrityError
import json
from django.http import JsonResponse
from .models import User,Category,Score
 # Create your views here.

def index(request):
    # Authenticated users view their inbox
    if request.user.is_authenticated:
        all_cats=Category.objects.all()
        return render(request, "quiz/index.html",{
            "categories": all_cats,
        })

    # Everyone else is prompted to sign in
    else:
        return HttpResponseRedirect(reverse("login"))
    
def make_game(request,category):
    return render(request, "quiz/make_game.html",{
        "category":category,
    })
    
def quiz(request,category):
    difficulty = request.POST['difficulty']
    questions =  request.POST['questions']
    categoryvalue = Category.objects.get(category=category).value
    return render(request, "quiz/quiz.html",{
        "category":categoryvalue,
        "difficulty":difficulty,
        "questions":questions,
    })
    
def score(request):
    if request.method == "POST":
        user = request.user
        data = json.loads(request.body)
        score = data["score"]
        value_category = data["category"]
        total_que = data["number"]
        category = Category.objects.get(value=value_category)
        difficulty = data["difficulty"]
        Score.objects.create(user=user,category=category,difficulty=difficulty,score=score,total_questions=total_que)
    return JsonResponse({"message": "Success"})

def history(request):
    history=Score.objects.filter(user=request.user).order_by("id").reverse()
    no_of_games = history.count()
    return render(request, "quiz/history.html",{
        "games":no_of_games,
        "history":history,
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "quiz/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "quiz/login.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        email = request.POST["email"]
        username = request.POST["username"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "quiz/register.html", {
                "message": "Passwords must match."
            })
        if email == "" or username=="":
            return render(request, "quiz/register.html", {
                "message": "Information is not complete"
            })
        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError as e:
            print(e)
            return render(request, "quiz/register.html", {
                "message": "Email address already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "quiz/register.html")
