// Declare global variables
var startBtn = document.querySelector("#startBtn");
var header = document.querySelector("header");
var questionDisplay = document.querySelector(".qAsk")
var answerList = document.querySelector("#answerList")

var questionIndex = 0
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
        ["true", true],
        ["false",false]
    ],
    [ //Answers to Q3
        ["{}", true],
        ["[]", false],
        ["()", false],
    ],
]
}

//testing array 
//var index = 0;
// console.log(questions.ask.length);
//console.log(questions.answer[index]);
// console.log(questions.answer[index].length)

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

function displayQuestions() {
    questionDisplay.textContent = questionsRandom.ask[questionIndex] + " ?";
    console.log(questionsRandom.answer[questionIndex])
    // Render a new li for each answer
    for (var index = 0; index < questionsRandom.answer[questionIndex].length; index++) {
        //var todo = todos[i];
        console.log(questionsRandom.answer[questionIndex][index][1])

        var li = document.createElement("li");
        li.textContent = questionsRandom.answer[questionIndex][index][0];
        li.setAttribute("data-correct", questionsRandom.answer[questionIndex][index][1]);

        answerList.appendChild(li);
    }

}

// function to initialise the quiz
startBtn.addEventListener("click", function(){
    shuffleQuestions(); //Shuffle the Q & A's
    initDisplay(); // initialise the display
    displayQuestions() // display the questions
})

answerList.addEventListener("click",function(event){
    var eventTarget = event.target;
    if (eventTarget.matches("li")) {
      //li item clicked here
    }
})


