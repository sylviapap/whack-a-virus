const startButton = document.getElementById("btn-start");
const viruses = document.getElementsByClassName("virus-pic")
const scoreNum = document.getElementById("score-num");
const numViruses = viruses.length;

const gameContainer = document.getElementById("game-container");
		
// Images
const virusImg = "assets/virus.png";
const virusWhackedImg = "assets/clean.png";

// Game Parameters
const gameTime = 12000;
const minPopUpTime = 1000;
const maxPopUpTime = 2000;
const timerNumber = document.getElementById("timer-num");

// Game State Variables
let timeUp = false;
let score = 0;
let gameTimer = null;
let popUpTimer = null;
let decrementSeconds = null;
let seconds = 12;

// Random virus
let virus = randomVirus(viruses);

startButton.addEventListener("click", () => {
	if(startButton.innerText === "Start Game"){
        gameContainer.removeAttribute("hidden");
		init();
	}
	else{
		stop();
	}
})
	
function init() {
	scoreNum.innerText = score;
	timeUp = false;
	startButton.innerText = "Stop Game";
	popUp();
	gameTimer = setTimeout(() => {
		console.log("Game Over...");
		startButton.innerText = "Start Game";
		timeUp = true;
	}, gameTime);		
	decrementSeconds = setInterval(function(){
		console.log("set interval is running")
		seconds -= 1;
		timerNumber.innerText = seconds + " seconds left!";
	}, 1000)
	
	}
	
function stop(){
	console.log("Game Stopped...");
	startButton.innerText = "Start Game";
	timeUp = true;
	Array.prototype.map.call(viruses, virus => virus.classList.remove("up"))
	clearInterval(popUpTimer);
	clearInterval(gameTimer);
	clearInterval(decrementSeconds);
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