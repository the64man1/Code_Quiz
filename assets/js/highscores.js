var clearHS = document.getElementById("clearHS");

function showHighScores (){
    //get high scores from local storage
    var highScores = JSON.parse(localStorage.getItem("highScores"));

    //if the user has clear high scores, exit
    if (!highScores) {
        return;
    }

    //create list of high scores
    highScores.forEach(function(score) {
    // create li tag for each high score
    var liTag = document.createElement("li");
    liTag.textContent = score.name + " - " + score.score;

    // display on page
    var olEl = document.getElementById("list");
    olEl.appendChild(liTag);
});
}

//clear high scores and reload page
function clearHighScores() {
    window.localStorage.removeItem("highScores");
    window.location.reload();
  }

//link to return to home screen
function returnHome() {
    window.location.assign("../../index.html");
}

showHighScores();

clearHS.addEventListener("click", clearHighScores);