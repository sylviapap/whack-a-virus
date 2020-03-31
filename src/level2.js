function startLevel2(){
	// Reset Vars
	timeUp = false;
	seconds = gameDuration/1000;
	newButton.innerText = "Go Back to Level 1"
	timerNumber.innerText = "Starting Level 2..."
	init2();
}

function init2() {
	noDisplay(level2Button);
	pauseButton.innerText = "Pause Game";
	popUp2();
	scoreNum.innerText = score;
	gameTimer = setTimeout(() => {
		timeUp = true;
		gameOver2();
	}, gameDuration);		
	decrementSeconds = setInterval(() => {
		if (seconds > 0) {
			seconds -= 1;
			timerNumber.innerText = seconds + " seconds left!";
		}
		else {
			timerNumber.innerText = `Time's up! Your score is ${score}`
		}
	}, 1000)
}

function popUp2(){
	let minPopUpTime = 800;
	let maxPopUpTime = 1000;
	let time = randomTime(minPopUpTime, maxPopUpTime);
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
			popUp2();
		}
	}, time);
}

function gameOver2() {
    stop();
    gameOverRestart();
}