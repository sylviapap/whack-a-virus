// Start Elements
const wrapper = document.getElementsByClassName("wrapper")[0]

// Create Buttons
const startButton = document.createElement("button")
startButton.className = "btn"
startButton.id="btn-start"
startButton.innerText = "Start Game"

const pauseButton = document.createElement("button")
pauseButton.className = "btn"
pauseButton.id="btn-pause"
pauseButton.innerText = "Pause Game"

const endButton = document.createElement("button")
endButton.className = "btn"
endButton.id="btn-end"
endButton.innerText = "End Game"

const newButton = document.createElement("button")
newButton.className = "btn"
newButton.id="btn-new"
newButton.innerText = "New Game"

const level2Button = document.createElement("button")
level2Button.className = "btn";
level2Button.innerText = "Play Level 2";

// Create Game Container
const gameContainer = document.createElement("div")
gameContainer.className = "game-container"
gameContainer.id = "game-container"

const scoreTimerDiv = document.createElement("div")
scoreTimerDiv.id = "score-timer-bar"

const buttonsDiv = document.createElement("div")
buttonsDiv.className = "game-buttons"
buttonsDiv.id = "game-buttons"

const countersContainer = document.createElement("div")
countersContainer.id = "counters-container"
countersContainer.className = "counters"

const scoreBox = document.createElement("div")
scoreBox.className = "score counter"
scoreBox.id = "score-box"

const timerBox = document.createElement("div")
timerBox.className = "timer counter"
timerBox.id = "timer-box"

const gameGrid = document.createElement("div")
gameGrid.className = "game-grid"

// Display Toggle
function setDisplay(element) {
    element.removeAttribute("style")
}

function noDisplay(element) {
    element.style.display = "none"
}