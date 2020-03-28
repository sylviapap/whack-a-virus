function gameOverRestart() {
	noDisplay(gameContainer);
	setDisplay(welcomeDiv);
	greeting.innerHTML = `Game over! <br> <p>Final score: ${score}</p>`
	startButton.innerText = "Play Again"
}