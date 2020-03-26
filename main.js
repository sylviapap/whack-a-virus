// Elements
const startButton = document.getElementById("btn-start");
const pauseButton = document.getElementById("btn-pause");
const endButton = document.getElementById("btn-end");
const newButton = document.getElementById("btn-new");

const viruses = document.getElementsByClassName("virus-pic")
const scoreNum = document.getElementById("score-num");
const timerNumber = document.getElementById("timer-num");
const gameContainer = document.getElementById("game-container");

// Visibility

gameContainer.style.visibility = "hidden";
pauseButton.style.visibility = "hidden";
endButton.style.visibility = "hidden";
newButton.style.visibility = "hidden";
		
// Images
const virusImg = "assets/virus.png";
const virusWhackedImg = "assets/clean.png";

// Times
const gameDuration = 10000;
const minPopUpTime = 1000;
const maxPopUpTime = 2000;

// Variables
let timeUp = false;
let score = 0;
let gameTimer = null;
let popUpTimer = null;
let decrementSeconds = null;
let seconds = gameDuration/1000;

// Random virus
const numViruses = viruses.length;
let virus = randomVirus(viruses);

// Event Listeners

startButton.addEventListener("click", () => {
	init();
	startButton.style.visibility = "hidden"
	}
)

pauseButton.addEventListener("click", () => {
	if(pauseButton.innerText == "Pause Game"){
		pauseButton.innerText = "Resume Game";
		stop();
	}
	else if (pauseButton.innerText == "Resume Game"){
		timeUp = false;
		pauseButton.innerText = "Pause Game"
		let newTimer = seconds*1000;
		gameTimer = setTimeout(gameTimerFn, newTimer);
		decrementSeconds = setInterval(decrementSecondsFn, 1000);
		popUp();
	}
})

newButton.addEventListener("click", () => {
	stop();
	score = 0;
	timerNumber.innerText = "";
	seconds = gameDuration/1000;
	init();
	}
)

endButton.addEventListener("click", () => {
	stop();
	startButton.style.visibility = "hidden"
	endButton.style.visibility = "hidden"
	pauseButton.style.visibility = "hidden"
	timerNumber.innerText = "Game over!"
	scoreNum.innerText = `Final score: ${score}`
})

// Start
	
function init() {
	gameContainer.style.visibility = "visible";
	pauseButton.style.visibility = "visible";
	endButton.style.visibility = "visible";
	newButton.style.visibility = "visible";
	popUp();
	scoreNum.innerText = score;
	timeUp = false;
	gameTimer = setTimeout(gameTimerFn, gameDuration);
	decrementSeconds = setInterval(decrementSecondsFn, 1000)
}

// Viruses Appear
	
function popUp(){
	const time = randomTime(minPopUpTime, maxPopUpTime);
	let virus = randomVirus(viruses);
	virus.classList.add("up");
	virus.addEventListener("click", () => {
		if(!virus.classList.contains("whacked")) {
		virus.src = virusWhackedImg
		virus.classList.remove("up")
		virus.classList.add("whacked")
		score++;
		scoreNum.innerText = score;
		}
	})
	popUpTimer = setTimeout(() => {
		virus.classList.remove("up", "whacked");
		virus.src = virusImg;
		if(timeUp === false){
			popUp();
		}
	}, time);
}

// Timer Functions

function gameTimerFn() {
	console.log("Game Over...");
	timeUp = true;
}

function decrementSecondsFn() {
	if (seconds > 0) {
		console.log("set interval is running")
		seconds -= 1;
		timerNumber.innerText = seconds + " seconds left!";
	}
	else {
		timerNumber.innerText = `Game over!`
		scoreNum.innerText = `Final score: ${score}`
	}
}

// Stop
	
function stop(){
	console.log("Game Stopped...");
	timeUp = true;
	Array.prototype.map.call(viruses, virus => virus.classList.remove("up"))
	clearInterval(popUpTimer);
	clearTimeout(gameTimer);
	clearInterval(decrementSeconds);
}

// Random Selectors

function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
	
function randomVirus(viruses) {
	const virusNum = Math.floor(Math.random() * numViruses);
	const virus = viruses[virusNum];
	return virus;
}