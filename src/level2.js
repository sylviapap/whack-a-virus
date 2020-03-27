function startLevel2(){
	console.log("start Level 2")
	// Reset Variables
	timeUp = false;
	score = 0;
	seconds = gameDuration/1000;
	newButton.innerText = "Go Back to Level 1"
	init2();
}

function init2() {
	noDisplay(level2Button);
	// in case of press 'pause' then 'new'
	pauseButton.innerText = "Pause Game";
	popUp2();
	scoreNum.innerText = score;
	timeUp = false;
	gameTimer = setTimeout(() => {
		console.log("Game 2 Over...");
		timeUp = true;
		gameOver2();
	}, gameDuration);		
	decrementSeconds = setInterval(function(){
		if (seconds > 0) {
			console.log("interval 2 is running")
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
	noDisplay(pauseButton);
	noDisplay(endButton);
	timerNumber.innerText = `Game over!`
	scoreNum.innerText = `Final score: ${score}`
}
		
function updateScoreForPlayer2(){
let userId = gameContainer.dataset.id
let gameId = 2;
let dataHash = {
value: score,
game_id: gameId,
user_id: userId
}

fetch(`${SCORES_URL}`, {
  method: 'POST',
  headers: {
  "Content-Type": 'application/json',
  Accepts: 'application/json'
  },
  body: JSON.stringify((dataHash))
})
.then(resp => resp.json())
.then(function(data){
  console.log("your score was sent for level 2!", data)
})
}