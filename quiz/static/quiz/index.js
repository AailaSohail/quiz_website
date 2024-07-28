let questions = [],
score = 0,
currentQ;

const numQuestion = document.querySelector(".quiz-number"),
loader =  document.querySelector(".container5"),
quiz = document.querySelector(".container3"),
category = document.querySelector(".quiz-category"),
difficulty = document.querySelector(".quiz-difficulty");

function StartQuiz () {
    const num = numQuestion.innerHTML;
    cat = category.innerHTML;
    diff = difficulty.innerHTML;

    const url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`;

    fetch(url)
    .then((res)=> res.json())
    .then((data) => {
        questions = data.results;
        console.log(questions);
        currentQ = 1;
        quiz.removeAttribute("hidden"); 
        loader.hidden = "true";
        showQuestion(questions[0]);
    });
};

window.addEventListener('load', StartQuiz);
const  nextbtn = document.getElementById("nextbtn"),
viewbtn = document.getElementById("viewbtn"),
 subbtn = document.getElementById("subbtn");

function showQuestion(question) {
    const questionText = document.querySelector(".question"),
    answerWrapper = document.querySelector(".answer-wrapper"),
    questionNumber = document.querySelector(".number");
    questionText.innerHTML = question.question;

    const answers = [ ... question.incorrect_answers,question.correct_answer.toString(),];
    answers.sort(() => Math.random() - 0.5);
    answerWrapper.innerHTML = "";
    answers.forEach((answer) => {
        answerWrapper.innerHTML += `
        <div class="answer">
            <span class="text">${answer}</span>
        </div>
        `;
    });

    questionNumber.innerHTML = `
    </br>
    <img src="../static/quiz/images/kittyy.png" class="image-nav">
    Question <span class="current">${questions.indexOf(question) +1}</span><span class="total">/${questions.length}</span>
    `;

    const answer_div = document.querySelectorAll(".answer");

    answer_div.forEach((answer) => {
        answer.addEventListener("click", () => {
            if(!answer.classList.contains("selected")){
                answer_div.forEach((answer) =>{
                answer.classList.remove("selected");
                });
                answer.classList.add("selected");
                subbtn.disabled = false;
            }
        });
    });
};

function submit () {
    if (currentQ != questions.length){
        nextbtn.removeAttribute("hidden"); 
    }
    else{
        viewbtn.removeAttribute("hidden"); 
    }
    const select_ans = document.querySelector(".answer.selected");
        const answer_text = select_ans.querySelector(".text");
        if(answer_text.innerHTML === questions[currentQ - 1 ].correct_answer){
            score++;
            select_ans.classList.add("correct");
        }
        else{
            select_ans.classList.add("wrong");
            const correct_ans = document.querySelectorAll(".answer").forEach((answer) =>{
                if( answer.querySelector(".text").innerHTML === questions[currentQ -1 ].correct_answer){
                    answer.classList.add("correct");
                }
            });
        }
        const all_ans = document.querySelectorAll(".answer");
        all_ans.forEach((answer) =>{
            answer.classList.add("done");
        });
};

function next(){
    nextbtn.hidden = "true";
    if (currentQ < questions.length){
        currentQ ++;
        showQuestion(questions[currentQ - 1]);
    }
    else{
        viewbtn.removeAttribute("hidden"); 
    }
};

function getCookie(name){
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if(parts.length == 2) return parts.pop().split(';').shift();
  };

function Score(){
    const score_screen = document.querySelector(".score-screen"),
    final_score = document.querySelector(".final-score"),
    goodscore = document.querySelector(".goodscore"),
    badscore = document.querySelector(".badscore"),
    quiz = document.querySelector(".quiz"),
    total = document.querySelector(".total-score");
    score_screen.removeAttribute("hidden"); 
    quiz.hidden="true";
    final_score.innerHTML = score;
    total.innerHTML = `/${questions.length}`;
    if(score > questions.length/2){
        goodscore.removeAttribute("hidden"); 
    }
    else{
        badscore.removeAttribute("hidden"); 
    }
    UpdateScore();
};

function UpdateScore(){
    const num = numQuestion.innerHTML;
    cat = category.innerHTML;
    diff = difficulty.innerHTML;

    fetch('/score', {
        method: 'POST',
        headers: {"Content-type": "application/json", "X-CSRFToken": getCookie("csrftoken")},
        body: JSON.stringify({
            score: score,
            category: cat,
            difficulty: diff,
            number: num,
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result.message);
    });
};