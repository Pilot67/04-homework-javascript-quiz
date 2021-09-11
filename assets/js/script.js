// Declare global variables
var startBtn = document.querySelector("#startBtn");
var header = document.querySelector("header");
var questionDisplay = document.querySelector(".qAsk");
var answerList = document.querySelector("#answerList");
var qNumber = document.getElementById("headingSpan");
var nextBtn = document.getElementById("nextBtn");

var questionIndex = 0;
answerSelected = false;
var score = 0;

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

function initDisplay(){
    header.setAttribute("style","display:none");

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



// function to initialise the quiz
startBtn.addEventListener("click", function(){
    for (i=0; i <5; i++){
        shuffleQuestions(); //Shuffle the Q & A's
        console.log(questions.ask[0]);
        //console.log(questionsRandom.ask.length)
    }
    initDisplay(); // initialise the display
    displayQuestions() // display the questions
})

answerList.addEventListener("click",function(event){
    var eventTarget = event.target;
    if (eventTarget.matches("li") && !answerSelected) {
        var correct = JSON.parse(eventTarget.getAttribute("data-correct"));
        answerSelected = true;
        console.log(correct);
        if (correct) {
            eventTarget.setAttribute("style","background-color: green;")
            score++
        }else{
            eventTarget.setAttribute("style","background-color: red;")
        }
        nextBtn.setAttribute("style","display:block")
    }
})

//function after the next button is clicked
nextBtn.addEventListener("click",function(){
    if (questionIndex < questionsRandom.ask.length - 1){
        console.log(questionsRandom.ask.length);
        questionIndex++;
        nextBtn.setAttribute("style","display:none")
        //remove all of the last answers
        while (answerList.hasChildNodes()){
            answerList.removeChild(answerList.firstChild);
        }
        //display the next question
        displayQuestions()
    }else {
        //end of quiz
        //displayResults()
    }
})
