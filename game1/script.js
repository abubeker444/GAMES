let playerScore = 0;
let computerScore = 0;
let roundNumber = 0;
let gameOver = false;

function play(playerChoice) {
  if (gameOver) return;

  const choices = ['Rock', 'Paper', 'Scissors'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  document.getElementById('player-choice').textContent = playerChoice;
  document.getElementById('computer-choice').textContent = computerChoice;

  let result = '';

  if (playerChoice === computerChoice) {
    result = "It's a draw!";
  } else if (
    (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
    (playerChoice === 'Paper' && computerChoice === 'Rock') ||
    (playerChoice === 'Scissors' && computerChoice === 'Paper')
  ) {
    result = 'You win!';
    playerScore++;
  } else {
    result = 'Computer wins!';
    computerScore++;
  }

  roundNumber++;
  document.getElementById('round-number').textContent = roundNumber;
  document.getElementById('result').textContent = result;
  document.getElementById('player-score').textContent = playerScore;
  document.getElementById('computer-score').textContent = computerScore;

  if (roundNumber === 3) {
    endGame();
  }
}

function endGame() {
  gameOver = true;
  let finalMessage = '';

  if (playerScore > computerScore) {
    finalMessage = '🎉 You won the game!';
  } else if (playerScore < computerScore) {
    finalMessage = '😞 Computer won the game!';
  } else {
    finalMessage = "🤝 It's a tie!";
  }

  document.getElementById('final-message').textContent = finalMessage;
  document.getElementById('restart-btn').style.display = 'inline-block';
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  roundNumber = 0;
  gameOver = false;

  document.getElementById('player-choice').textContent = '-';
  document.getElementById('computer-choice').textContent = '-';
  document.getElementById('result').textContent = '-';
  document.getElementById('player-score').textContent = playerScore;
  document.getElementById('computer-score').textContent = computerScore;
  document.getElementById('round-number').textContent = roundNumber;
  document.getElementById('final-message').textContent = '';
  document.getElementById('restart-btn').style.display = 'none';
}
