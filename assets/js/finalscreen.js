var lastScore = localStorage.getItem("lastScore");
var username = document.getElementById("username");
var saveScore = document.getElementById("saveScore");

//get highscores from local storage, or create an empty array to store scores if there are none in storage
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//show the most recent score on final page
document.getElementById("lastScore").innerHTML = `${lastScore}/5`;

//disable submit form if no username input
username.addEventListener('keyup', function () {
    saveScore.disabled = !username.value;
});


const saveHS = (e) => {
    //prevent the form from clearing upon sumbission
    e.preventDefault();
    console.log(e.currentTarget);
    

    //save score with username as an object
    var score = {
        score: lastScore,
        name: username.value,
    };
    //push new score into array of high scores
    highScores.push(score);

    //Sort the high scores array
    highScores.sort((a,b) => b.score - a.score);

    //put high score array back in local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    //remove input box and save button once the user has entered their name and hit save
    saveScore.style.display = "none";
    username.style.display = "none";
}

saveScore.addEventListener("click", saveHS);