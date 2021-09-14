// Declare global variables
var startBtn = document.querySelector("#startBtn");
var header = document.querySelector("header");
var questionDisplay = document.querySelector(".qAsk");
var answerList = document.querySelector("#answerList");
var qNumber = document.getElementById("headingSpan");
var questionCard = document.querySelector(".qCard");
var timerDisplay = document.querySelector("#timerSpan");
var feedBack = document.querySelector("#feedBack");
var numAnswered = document.querySelector("#resultNum");
var scoreEl = document.querySelector("#score")
var resultEl = document.querySelector(".resultWrapper");
var cardEl = document.querySelector(".cardWrapper");
var highEl = document.querySelector(".highWrapper");
var highListEl = document.querySelector(".highList");
var scoreCloseBtn = document.querySelector("#scoreCloseBtn");
var highBtn = document.querySelector("#highBtn");

var questionIndex = 0;
var answerSelected = false;
var nextQuestion = false;
var score = 0;
var qTimer, timerInterval, timerStart;
//var timerStart = false;
var highScoreArr = [
    {name:"Stuart", score:7},
    {name:"Carrie", score:12},
    {name:"Katie", score:6}
];

var colors = {
    greenTrue:"#48d325",
    redFalse:"#e03030"
}


//Question array as follows:
//  ask is an array under the oblect questions.ask
//  answer is a 2d array under the object questions.answer[index of question][index of text][index of correct]
questions = {
    ask: [
        "Who is the founder of javascript", //Q1
        "True or False: A function can be included in an object", //Q2
        "To define an object you use which type of bracket", //Q3
    ],
    answer: [
    [ //Answers to Q1
        ["Bill Gates" , false],
        ["Steve Jobs", false],
        ["Mark Zuckerberg", false],
        ["Brendan Elch", true],
    ],
    [ //Answers to Q2
        ["True", true],
        ["False",false]
    ],
    [ //Answers to Q3
        ["{}", true],
        ["[]", false],
        ["()", false],
    ],
]
}

//create random questions
var questionsRandom = questions;
//Shuffle the question deck
function shuffleQuestions() {
    // For loop to shuffle the questions and corresponding answers
    for (var index = questionsRandom.ask.length - 1; index > 0; index--){
      randomIndex = Math.floor(Math.random() * index);
        // shuffle the questions
        [questionsRandom.ask[index], questionsRandom.ask[randomIndex]] = [questionsRandom.ask[randomIndex], questionsRandom.ask[index]];
        //shuffle the corresponding answers
        [questionsRandom.answer[index], questionsRandom.answer[randomIndex]] = [questionsRandom.answer[randomIndex], questionsRandom.answer[index]];
    }
    // Now shuffle the answers only
    for (var answerIndex = 0; answerIndex < questionsRandom.answer.length; answerIndex++){
        for (var index = questionsRandom.answer[answerIndex].length - 1; index > 0; index--){
            randomIndex = Math.floor(Math.random() * index);
            // shuffle the answers
            [questionsRandom.answer[answerIndex][index], questionsRandom.answer[answerIndex][randomIndex]] = 
            [questionsRandom.answer[answerIndex][randomIndex], questionsRandom.answer[answerIndex][index]];
        }
    }
}  

function initQuestionDisplay(){
    header.setAttribute("style","display:none");
    cardEl.setAttribute("style","display:block")
}

//function to render the questions on the screen
function displayQuestions() {
    qNumber.textContent = questionIndex+1;
    questionDisplay.textContent = questionsRandom.ask[questionIndex] + " ?";
    // Render a new li for each answer
    for (var index = 0; index < questionsRandom.answer[questionIndex].length; index++) {
        //var todo = todos[i];

        var li = document.createElement("li");
        li.textContent = questionsRandom.answer[questionIndex][index][0];
        li.setAttribute("data-correct", questionsRandom.answer[questionIndex][index][1]);
        answerList.appendChild(li);
    }
    answerSelected=false;
}

//function to start the quiz timer
function startGameTimer(){
    timerStart = true;
    qtimer = 10;
    timerInterval = setInterval(function(){
        qtimer--;
        timerDisplay.textContent = qtimer;
        if(qtimer === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            timerStart = false;
            endGame() //end of game
        }
    },1000 );
}

// function to initialise the quiz
startBtn.addEventListener("click", function(){
    shuffleQuestions(); //Shuffle the Q & A's
    initQuestionDisplay(); // initialise the display
    displayQuestions() // display the questions
    startGameTimer();
})

answerList.addEventListener("click",function(event){
    var eventTarget = event.target;
    if (eventTarget.matches("li") && !answerSelected) {
        var correct = JSON.parse(eventTarget.getAttribute("data-correct"));
        answerSelected = true;
        if (correct) {
            eventTarget.setAttribute("style","background-color: " + colors.greenTrue + ";");
            feedBack.setAttribute("style", "color:" + colors.greenTrue);
            feedBack.textContent = "Correct !";
            score++;
        }else{
            eventTarget.setAttribute("style","background-color: " + colors.redFalse + ";");
            feedBack.setAttribute("style", "color:" + colors.redFalse);
            feedBack.textContent = "Wrong !";
        }
        //call next question
        nextQn();
    }
})

function nextQn() {
    var delay = 6;
    var localInterval = setInterval(function(){
        delay--;
        if(delay === 0) {
            // Stops execution of action at set interval
            clearInterval(localInterval);
            clearQuestions()
        }
    },100 );
}

function clearQuestions () {
    feedBack.textContent = " ";
    questionIndex++;
    if (questionIndex < questionsRandom.ask.length){
        //remove all of the last answers
        while (answerList.hasChildNodes()){
            answerList.removeChild(answerList.firstChild);
        }
        //display the next question
        displayQuestions()
    }else {
        clearInterval(timerInterval);
        endGame()//end of quiz
        //displayResults()
    }

}
function endGame(){
    cardEl.setAttribute("style","display:none");
    resultEl.setAttribute("style", "display:block");
    numAnswered.textContent = questionIndex + " Questions";
    scoreEl.textContent = score;
}


//initialise
function init(){
    //Clear the displays
    header.setAttribute("style","display:block");
    cardEl.setAttribute("style","display:none");
    resultEl.setAttribute("style", "display:none");
    highEl.setAttribute("style", "display:none");
    getHighScores() //load the high score
 }
 //Save the high scores to local storage
 function saveHighScores(){
    localStorage.setItem("highScores",JSON.stringify(highScoreArr));
 }
 //get the high scores from local storage
 function getHighScores(){
    highScoreArr = JSON.parse(localStorage.getItem("highScores"));
    if (highScoreArr !== null) {
        //console.log(highScoreArr);
        highScoreArr.sort(function(a, b){return b.score - a.score})
        for (var index=0; index < highScoreArr.length;index++ ){
             var li = document.createElement("li");
             li.textContent = highScoreArr[index].name + "  :  " + highScoreArr[index].score;
             highListEl.appendChild(li)
        }
    }else {
        var li = document.createElement("li");
        li.textContent = "Nothing to Display";
        li.setAttribute("style", "width:100%")
        highListEl.appendChild(li)
    }
 }
 //close the high score panel
 scoreCloseBtn.addEventListener("click", function(){
     init();
 })

 //Display the high scores on screen
function displayHighScores(){
    header.setAttribute("style","display:none");
    highEl.setAttribute("style", "display:block");    
}
//event listner to display the high scores     
highBtn.addEventListener("click", displayHighScores);

init()