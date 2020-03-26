// Elements
const startButton = document.getElementById("btn-start");
const pauseButton = document.getElementById("btn-pause");
const viruses = document.getElementsByClassName("virus-pic")
const scoreNum = document.getElementById("score-num");
const timerNumber = document.getElementById("timer-num");
const gameContainer = document.getElementById("game-container");
		
// Images
const virusImg = "assets/virus.png";
const virusWhackedImg = "assets/clean.png";

// Game Parameters
const gameTime = 7000;
const minPopUpTime = 1000;
const maxPopUpTime = 2000;

// Game State Variables
let timeUp = false;
let score = 0;
let gameTimer = null;
let popUpTimer = null;
let countDown = null;
let seconds = gameTime/1000;

// Random virus
const numViruses = viruses.length;
let virus = randomVirus(viruses);

// Functions

startButton.addEventListener("click", () => {
	if(startButton.innerText === "Start Game"){
        gameContainer.removeAttribute("hidden");
        pauseButton.removeAttribute("hidden");
		init();
	}
	else if(startButton.innerText === "New Game"){
		score = 0;
		clearInterval(popUpTimer);
		clearTimeout(gameTimer);
		clearInterval(countDown);
		timerNumber.innerText = "";
		seconds = gameTime/1000;
		init();
	}
	else{
		stop();
	}
})

pauseButton.addEventListener("click", () => {
	let start = Date.now();
	if(pauseButton.innerText === "Pause Game"){
		pauseButton.innerText = "Resume Game"
		stop();
	}
	else{
		pauseButton.innerText = "Pause Game"
		let remaining = Date.now() - start;
		gameTimer = setTimeout(() => {
			console.log("Resuming...");
			timeUp = true;
		}, remaining);
		setInterval(decrementSeconds, 1000);
	}

})
	
function init() {
	scoreNum.innerText = score;
	timeUp = false;
	startButton.innerText = "End Game";
	popUp();
	gameTimer = setTimeout(() => {
		console.log("Game Over...");
		timeUp = true;
	}, gameTime);
	countDown = setInterval(decrementSeconds, 1000)
}

function decrementSeconds() {
	if (seconds > 0) {
		console.log("set interval is running")
		seconds -= 1;
		timerNumber.innerText = seconds + " seconds left!";
	}
	else {
		timerNumber.innerText = `Time's up! Your score is ${score}`
	}
}
	
function stop(){
	console.log("Game Stopped...");
	startButton.innerText = "New Game";
	timeUp = true;
	Array.prototype.map.call(viruses, virus => virus.classList.remove("up"))
	clearInterval(popUpTimer);
	clearTimeout(gameTimer);
	clearInterval(countDown);
}
	
function popUp(){
	const time = randomTime(minPopUpTime, maxPopUpTime);
	let virus = randomVirus(viruses);
	virus.classList.add("up");
	virus.addEventListener("click", () => {
		if(virus.classList.contains("whacked")){
			return;
		}
		else {
		virus.setAttribute("src", virusWhackedImg)
		virus.classList.remove("up")
		virus.classList.add("whacked")
		score++;
		scoreNum.innerText = score;
		}
	})
	popUpTimer = setTimeout(() => {
		virus.classList.remove("up", "whacked");
		virus.setAttribute("src", virusImg)
		if(timeUp === false){
				popUp();
			} 
	}, time);
}

function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
	
function randomVirus(viruses) {
	const virusNum = Math.floor(Math.random() * numViruses);
	const virus = viruses[virusNum];
	return virus;
}