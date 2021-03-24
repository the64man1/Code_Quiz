var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("answer-choice"));
var timerEl = document.getElementById("timer");

var currentQuestion = {};
var canAnswer = false;
var score = 0;
var questionCount = 0;
var possibleQuestions = [];
var time = 60;
var timer;

// Save questions as an array of objects, with an "answer" key to designate which response is correct
var questions = [
    {
      title: "Which character is used when assigning a value to a variable?",
      choice1: ":", 
      choice2: "=", 
      choice3: ">", 
      choice4: "#",
      answer: 2
    },
    {
      title: "Which variable declaration keyword would you use if you did not want to allow the variable to be reassigned?",
      choice1: "var",
      choice2: "const",
      choice3: "let",
      choice4: "none of the above",
      answer: 2
    },
    {
      title: "Which CSS syntax is used to select all <p> elements where the parent is a <div> element?",
      choice1: "div p",
      choice2: "div, p",
      choice3: "div > p",
      choice4: "div + p",
      answer: 3
    },
    {
      title: "In reference to objects in the DOM, a(n) _____ is a value that you can get or set (like changing the content of an HTML element).",
      choice1: "method",
      choice2: "class",
      choice3: "variable",
      choice4: "property",
      answer: 4
    },
    {
      title: "_____ is a format for storing and transporting JavaScript data.",
      choice1: "Node.js", 
      choice2: "JSON", 
      choice3: "jQuery", 
      choice4: "Java",
      answer: 2
    }
  ];

startGame = () => {
  //make sure the question count and score reset
  questionCount = 0;
  score = 0;
  //set the possible questions array equal to all available questions to start
  possibleQuestions = [...questions];
  //start the timer function
  timer = setInterval(clockTick, 1000);
  //display the timer on the screen
  timerEl.textContent = time;
  //get the first question
  getNextQuestion();
};

getNextQuestion = () => {
  //once there are no remaining questions, save the score in local storage to display on the final screen, then go to the final screen
  if (possibleQuestions.length === 0) {
    localStorage.setItem("lastScore", score);
    endQuiz();
  }
  //keep track of how many questions have been asked
  questionCount++;
  //get a random question and display it
  var qIndex = Math.floor(Math.random() * possibleQuestions.length);
  currentQuestion = possibleQuestions[qIndex];
  question.innerText = currentQuestion.title;

  //Put answer choices for current question in each box
  choices.forEach(choice => {
      var number = choice.dataset["number"];
      choice.innerText = currentQuestion["choice" + number];
  });

  //Take out the question just answered from the available questions
  possibleQuestions.splice(qIndex, 1);
  //Allow an answer to be selected
  canAnswer = true;
};

//create function for timer
function clockTick() {
    // update time
    time--;
    //display time on screen
    timerEl.textContent = time;
    //end quiz if time runs out
    if (time <= 0) {
        endQuiz();
    }
  }  

function endQuiz () {
    //go to end screen
    return window.location.assign("./finalscreen.html");
}

//Apply a function to each choice that will register when and which choice is clicked, then check if that choice is the correct answer, then move to the next question
choices.forEach(choice => {
    choice.addEventListener("click", event => {
        //Don't run if the a choice has been clicked but we haven't allowed a choice to be selected yet
        if (!canAnswer) return;
        
        //momentarily shut off ability to answer to minimize double click errant choices
        canAnswer = false;
        //store which choice/answer was selected
        var selectedChoice = event.target;
        var selectedAnswer = selectedChoice.dataset["number"];

        //Apply a class of either incorrect or correct to the selected answer so we can register for scoring and printing correctness on screen
        var classToApply = "incorrect";
          if (selectedAnswer == currentQuestion.answer) {
            classToApply = "correct";
          }
    
        //If selected choice is correct, run a function to increase the score
        if (classToApply == "correct") {
            increaseScore();
        } else {
            //decrease timer by 10 seconds if user selects incorrect answer
            time -= 10;
            //if timer goes below zero, set timer to zero and end quiz
            if (time < 0) {
                time = 0;
                endQuiz();
            }
        }
        //In CSS, apply a color to the box based on if the answer was correct or incorrect
        selectedChoice.parentElement.classList.add(classToApply);
    
        //Print on screen whether choice was correct or incorrect based on which class was applied
        if (selectedChoice.parentElement.classList.contains('incorrect')) {
            document.getElementById("result").innerHTML = "Incorrect!";
        } else {
            document.getElementById("result").innerHTML = "Correct!";
        }
        
        //After a half second delay, remove incorrect/correct class and get next question
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNextQuestion();
          }, 500);
    });
});

//Function to increase score and print the current score to screen
function increaseScore () {
    score++;
    document.getElementById("score").innerHTML = `${score}/5`;
}

startGame();