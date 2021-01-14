const originalBox = document.querySelector("#originalText");
const testArea = document.querySelector("#text-Area");
const originText = document.querySelector("#originalText p").innerHTML;
const resetButton = document.querySelector("#resetButton");
const timerClock = document.querySelector("#timer");
const resultBox = document.querySelector("#result p");

var timer = [0,0,0,0];
var interval = 0;
var timerRunning = false;
var cpm = 0;

// Runs timer and stores time value
function startTimer() {
    var currentTime = timer[0] + ":" + timer[1] + ":" + timer[2];
    timerClock.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let textMatch = originText.substring(0, textEntered.length);
    let totalMin = 0;

    if(textEntered === originText)
    {
      totalMin = timer[0] + (timer[1]/60) + (timer[2]/3600);
      cpm = originText.length/totalMin;
      originalBox.style.border = "1px solid green";
      clearInterval(interval);
      resultBox.style.backgroundColor = "#FFE4B5";
      resultBox.innerHTML = "Your CPM is: " + Math.round(cpm);
    }
    else if (textEntered === textMatch)
    {
      originalBox.style.border = "3px solid purple";
    }
    else
    {
      originalBox.style.border = "3px solid orange";
    }

    console.log('Enter:' + textEntered);
    console.log('Match:' + textMatch);
    console.log('Full:' + originText);
}

// Start the timer:
function start() {
    let textEnterdLength = testArea.value.length;
    if (textEnterdLength === 0 && timerRunning == false) {
        timerRunning == true;
        interval = setInterval(startTimer, 10);
    }
    console.log(textEnterdLength);
}

// Reset everything:
function reset() {
    console.log("reset button has been pressed!");
    clearInterval(interval);
    timerClock.innerHTML = "00:00:00";
    testArea.value = "";
    originalBox.style.border = "3px solid #B0C4DE";
    timerRunning = false;
    timer = [0,0,0,0];
    cpm = 0;
    resultBox.style.backgroundColor = "#F8F8FF";
    resultBox.innerHTML = "";
}

// Event listeners for keyboard input and the reset
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
