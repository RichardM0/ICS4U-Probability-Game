// set global variables for score generation
let score1 = 0;
let score2 = 0;
let generating;
// adding global variable so score isn't added multiple times when clicking stop + global variables for information
let scoreAdded = false;
let roundNum = 1;
document.getElementById("roundNum").innerHTML = "Round " + roundNum;
let turn = 1;
// variable to check if the rules has been shown
let rulesShown = false;

function getRandomInt(min, max) {
  // find random integer
  const randInt = Math.floor(Math.random() * (max - min + 1) + min);
  return randInt;
}

function sumDigits(a) {
  // recursive function using modular arithmetic to find sum of digits
  if (a == 0) {
    return 0;
  }
  return sumDigits(Math.floor(a / 10)) + (a % 10);
}


function generate() {
  // display round info; whose turn and round number
  document.getElementById("turnInfo").innerHTML = "Player " + turn + " is playing...";
  document.getElementById("roundNum").innerHTML = "Round " + roundNum;
  // check if not generating. If it's not generating, create an interval and generate.
  if (!generating) {
    generating = setInterval(pickNumber, 50);
  }
}

function pickNumber() {
  // picking a number and displaying it on the two display boxes
  randInt = 2 * getRandomInt(1, 6);
  randInt2 = 2 * getRandomInt(1, 6) - 1;
  document.getElementById("playerOneNum").innerHTML = randInt;
  document.getElementById("playerTwoNum").innerHTML = randInt2;
  scoreAdded = false;
}

// sleep function for styling
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stop() {
  // when clicked stop, set generating to nothing and clear interval.
  clearInterval(generating);
  generating = null;
  // finding sum
  const num1 = parseInt(document.getElementById("playerOneNum").innerHTML);
  const num2 = parseInt(document.getElementById("playerTwoNum").innerHTML);
  const sum = num1 + num2;
  // find sum of two numbers rolled and sum the digits
  const digitSum = sumDigits(sum);
  // check if score has already been added before, this stops repeat adding score + repeating incrementing rounds
  if (!scoreAdded) {
    // display player outcome for clarity
    document.getElementById("turnInfo").innerHTML = "Player " + turn + " outcome:";
    // checking if it is player one's turn and the digit sum is divisible by 4
    if (digitSum % 4 == 0 && turn == 1) {
      const msg = "The digit sum, " + digitSum + ", is divisible by 4. One point is granted for Player One";
      score1 += 1;
      // styling animations, changing score and message
      document.getElementById("playerOneScore").style.fontSize = "100px";
      document.getElementById("ruleMsg").innerHTML = msg;
      sleep(1500).then(() => {
        // reset to default after 1.5 seconds
        document.getElementById("playerOneScore").style.fontSize = "48px";
      });
    }
    // check if it is player two's turn and a card is a multiple of the other
    else if ((num1 % num2 == 0 || num2 % num1 == 0) && turn == 2) {
      // transition for score2
      const msg = "The second card is a multiple of the first. One point is granted for Player Two";
      score2 += 1;
      // styling animations and changing score
      document.getElementById("playerTwoScore").style.fontSize = "100px";
      document.getElementById("ruleMsg").innerHTML = msg;
      sleep(1500).then(() => {
        // reset to default after 1.5 seconds
        document.getElementById("playerTwoScore").style.fontSize = "48px";
      });
    } else {
      // case when no constraints are satisfied
      const msg = "Player " + turn + " did not receive points.";
      document.getElementById("ruleMsg").innerHTML = msg;
    }
    // changing turns
    if (turn == 1) {
      turn = 2;
    } else if (turn == 2) {
      turn = 1;
    }
    // increment round number at the end of a round
    roundNum += 1;
  }
  // display score
  document.getElementById("playerOneScore").innerHTML = score1;
  document.getElementById("playerTwoScore").innerHTML = score2;

  // set scoreAdded to true, so this code isn't repeated when spam clicking stop.
  scoreAdded = true;
}

function showRules() {
  // function to see rules after clicking on header
  const info = document.getElementById("rules");
  const header = document.getElementById("rule-header");
  if (!rulesShown) {
    // if rules are invisible and clicked, show
    info.style.visibility = "visible";
    info.style.display = "block";
    header.innerHTML = "Click to Hide";
    rulesShown = true;
  } else if (rulesShown) {
    // if rules are visible and clicked, hide
    info.style.visibility = "hidden";
    info.style.display = "none";
    header.innerHTML = "Click for Rules";
    rulesShown = false;
  }
}

// adding listeners for clicking buttons
document.getElementById("generate").addEventListener("click", generate);

document.getElementById("stop").addEventListener("click", stop);

document.getElementById("rule-header").addEventListener("click", showRules);
