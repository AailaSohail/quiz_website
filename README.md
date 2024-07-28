# CAT-ASTROPHIC QUIZES


This is CAT-ASTROPHIC QUIZES, designed and implemented as my final project for Harvard's [CS50 Web Programming with Python and JavaScript](https://cs50.harvard.edu/web/2020/) course. CAT-ASTROPHIC is a web application written primarily in Python (Django) (*on the back-end*) and JavaScript (*on the front-end*).


### What is CAT-ASTROPHIC QUIZES?

It is a quiz website where the user can test their knowlegde regarding different topics. The difficulty level ranges from easy to hard with the option to answer 5 to 20 questions. The users' score is recorded and they can view their playing history by navigation to "Your playing history" on the NavBar.

## How CAT-ASTROPHIC QUIZES Works

 CAT-ASTROPHIC is a web application written in Python, JavaScript, HTML, and CSS. The application contains a SQLite database, with data managed through Python objects ('models').

This project makes use of The Open Trivia Database API. 
A large portion of the site's interactive features is handled front-end via several small HTML files stitched together with client-side javascript:
* The javascript requests the quiz content using an API; as it is required via asynchronous (or AJAX) requests, inserts the question and the 4 options on the page, and adds the required interactive functionality to the HTML elements once loaded.(as mentioned under the heading "quiz" in "templates")
* Once the user has completed their quiz, the page javascript collects the user's score and submits it to the respective route’s view function(url:path("score", views.score, name="score"), function: def score(request)) via a POST request

While Python does most of the websites heavy lifting (rendering HTML pages, updating the app's database, processing data, etc.), JavaScript is used to retrieve data (typically in the form of asynchronous `fetch` functions, passing over to backend API functions (described above) for processing) and update HTML pages as required.

## Distinctiveness and Complexity

This Project utilises most of the concepts and techniques covered in CS50W. 

This web application uses external API for quiz question retrieval, keeps track of users' playing history and of users' scores in real-time as they answer questions.It also has a User-Friendly UI/UX.

In respect to CS50W's other grading requirements, CAT-ASTROPHIC QUIZES is mobile responsive, utilises Django (with three associated models), and JavaScript as described above.

## File Structure
 CAT-ASTROPHIC QUIZES project has one app - `quiz/`:

**`quiz/`** handles all of the functionality of the quiz website. Following are the files and folders contained within this app that I have created and primarily worked in:

**`static`**: Contains the following files and folder:
1. **images (folder)**: It contains all the cat icons used in the navbar and various selection menus throughout the app.

2. **index.js**: It contains the Javascript used in the front-end to display the quiz Questions and the score accordingly.

3. **style.css**: It contains all the css used in making the website.

**`templates`**: Contains the following html files:
1. **layout**: Conatains html for the navbar that is inherieted by all the html files. Also contains JavaScript that makes the navbar responsive.The navbar contains(when the user is logged in) The user's Username , "Your Playing History" , "CAT-ASTROPHIC QUIZES", "Logout". All of these are hyperlinks linking to different parts of the website.

2. **login**: html for login.

3. **register**: html for register.

4. **index**: Contains html for when the user is logged in, users first see this index screen. It displays all the categories avaiblable for the user to choose from. Each category card contains the quiz's title, description, image and a start button.

5. **make_game**: Contains html for the page in which the user makes the game. Displays two drop down menus from which the user can chose the difficulty and number of questions then press the "Start Quiz" button that is in a form that has the method "POST".

6. **quiz**: It contains html for the actual quiz. Displays the question and 4 options as well as a submit button which is disabled. When the answer is selected, the submit button is enabled.When the answer is submitted, correct and wrong answers are highlighted and a "Next" button appears to move onto the next question and the "Submit" button is disabled. when all questions have been answered a "View Score" button appears that displays the user's score. If the user has secured above 50% marks then a "Well Done!" message with a cat icon appears, otherwise a message saying "Here's some coffee! Better Luck Next time!", accompanied by a diffrent cat icon, appears.

7. **history**: It contains html for "Your Playing History". it displays how many quizes the user has attempted in total and a table containing the specificities of each quiz i.e: Category, difficulty, Total Questions, Your score. These enteries are displayed in reverse order i.e: newest at the top.

**`admin.py`**: The admin.py file is used to display your models(3) in the Django admin panel.

**`models.py`**: The project contains a total of 3 models which are as follows:
1. **User**: Contains information about the users.

2. **Category**: contains all the categories of quizes available.It contains the following information: *1.Category 2.Value(value that is to be inserted in the API to fetch the data of that particular category) 3.Description 4.Image*. New categories can be added but only the superuser has the authority to do so by going to the *Django admin panel*.

3. **Score**: Contains all the Scores of all the users of every game they have ever played.It contains the following information: *1.Category 2.Score 3.Difficulty 4.Total Questions 5.User*.

**`urls.py`**: A request in Django first comes to urls.py and then goes to the matching function in views.py. Contains the following urls:     
```
path("", views.index, name="index"),
path("login", views.login_view, name="login"),
path("logout", views.logout_view, name="logout"),
path("register", views.register, name="register"),
path("make_game/<str:category>", views.make_game,name="make_game"),
path("quiz/<str:category>", views.quiz, name="quiz"),
path("score", views.score, name="score"),
path("histoy", views.history, name="history"),
```
**`views.py`**: Following are the functions contained within this file:

1. **index**: Checks if the user is authenticated. If yes, then gets all the categories from the database and renders "quiz.html" page. else gives the login page.

2. **make_game**: The category is passed into this function and it renders "make_game.html" page.

3. **quiz**: Gets the number of questions and difficulty from "make_game.html" page. The category is passed into the function. Using this information it gets the "value" of that category from the database and renders the "quiz.html" page.

4. **score**: If the method is "POST" then we get the current user. The information passed to the backend using JavaScript is loaded i.e: Final Score, Category, Total Questions and difficulty. A new entry in the "Score" table is created using this information. A json response is sent back; a message saying "Success".

5. **history**: All the quizes played by the current user are filtered from the database and are obtained in the reverse order(newest to oldest). The total played quizes are counted and "history.html" page is rendered.

6. **login_view**: This functions logs in a user and reverse renders "index.html" page. else if anything goes wrong it reverse renders the "login.html" page with a error message.

7. **logout_view**: This functions logs out a user.

8. **register**: This function registers a new user. If passwords dont match or email is invalid or the information is not properly filled, it displays an error message accordingly.

## Get Started

```
1. Make and apply migrations by running python manage.py     makemigrations and python manage.py migrate.

2. Create superuser with python manage.py createsuperuser. This  step is optional.

3. Go to website address and register an account.
```
To navigate CAT-ASTROPHIC QUIZES, use the app's NavBar. All pages requires the user to have an account with the application and be signed in (go to **Register** / **Log In)**. Website's default **Index** page displays all the available quiz catogories.



<hr>