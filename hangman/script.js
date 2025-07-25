const wordList = [
  {
    word: "apple",
    hints: ["A common fruit.", "Keeps the doctor away.", "Can be red, green, or yellow."],
    icon: "🍎"
  },
  {
    word: "bridge",
    hints: ["Used to cross rivers.", "Often built from steel or wood.", "Can be suspended or arched."],
    icon: "🌉"
  },
  {
    word: "diamond",
    hints: ["A precious gemstone.", "Formed under high pressure.", "Often used in engagement rings."],
    icon: "💎"
  },
  {
    word: "library",
    hints: ["A quiet place.", "Full of books.", "You can borrow things for free."],
    icon: "📚"
  },
  {
    word: "volcano",
    hints: ["Can erupt.", "Lava flows from it.", "A mountain of fire."],
    icon: "🌋"
  }
];

const MAX_ATTEMPTS = 6;
let selectedWordObj;
let selectedWord = "";
let correctLetters = [];
let wrongLetters = [];
let hintsUsed = 0;
let revealUsed = false;
let attemptsLeft = MAX_ATTEMPTS;

function getRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function displayWord() {
  const wordDisplay = selectedWord
    .split("")
    .map(letter => (correctLetters.includes(letter) ? letter : "_"))
    .join(" ");

  document.getElementById("word").textContent = wordDisplay;

  if (!wordDisplay.includes("_")) {
    document.getElementById("message").textContent = "🎉 You won!";
    disableInput();
  }
}

function updateWrongLetters() {
  document.getElementById("wrong-letters").textContent = wrongLetters.join(" ");
  document.getElementById("attempts").textContent = `🕒 Attempts Left: ${attemptsLeft}`;

  if (attemptsLeft <= 0) {
    document.getElementById("message").textContent = `💀 You lost! The word was "${selectedWord}".`;
    disableInput();
  }
}

function guessLetter() {
  const input = document.getElementById("letter-input");
  const letter = input.value.toLowerCase();

  if (!letter.match(/[a-z]/i)) {
    alert("Please enter a valid letter.");
    input.value = "";
    return;
  }

  if (selectedWord.includes(letter)) {
    if (!correctLetters.includes(letter)) {
      correctLetters.push(letter);
    }
  } else {
    if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);
      attemptsLeft--;
    }
  }

  input.value = "";
  displayWord();
  updateWrongLetters();
}

function showHint() {
  if (hintsUsed >= 3) {
    document.getElementById("hint").textContent = "❌ No hints left.";
    return;
  }

  const hintText = selectedWordObj.hints[hintsUsed];
  document.getElementById("hint").textContent = `💡 Hint ${hintsUsed + 1}: ${hintText}`;

  if (hintsUsed === 0) {
    document.getElementById("icon").textContent = `🔍 Icon: ${selectedWordObj.icon}`;
  }

  hintsUsed++;
  if (hintsUsed >= 3) {
    document.getElementById("hint-btn").disabled = true;
  }
}

function revealOneLetter() {
  if (revealUsed) {
    document.getElementById("reveal-msg").textContent = "❌ Letter already revealed.";
    return;
  }

  const unrevealedLetters = selectedWord
    .split("")
    .filter(letter => !correctLetters.includes(letter));

  if (unrevealedLetters.length === 0) {
    document.getElementById("reveal-msg").textContent = "✅ All letters already revealed!";
    return;
  }

  const randomLetter = unrevealedLetters[Math.floor(Math.random() * unrevealedLetters.length)];
  correctLetters.push(randomLetter);
  revealUsed = true;

  document.getElementById("reveal-msg").textContent = `✨ Letter revealed: "${randomLetter.toUpperCase()}"`;
  document.getElementById("reveal-btn").disabled = true;

  displayWord();
}

function disableInput() {
  document.getElementById("letter-input").disabled = true;
  document.getElementById("hint-btn").disabled = true;
  document.getElementById("reveal-btn").disabled = true;
}

function resetGame() {
  correctLetters = [];
  wrongLetters = [];
  hintsUsed = 0;
  revealUsed = false;
  attemptsLeft = MAX_ATTEMPTS;
  selectedWordObj = getRandomWord();
  selectedWord = selectedWordObj.word;

  document.getElementById("letter-input").disabled = false;
  document.getElementById("hint-btn").disabled = false;
  document.getElementById("reveal-btn").disabled = false;
  document.getElementById("message").textContent = "";
  document.getElementById("wrong-letters").textContent = "";
  document.getElementById("hint").textContent = "💡 You have 3 hints.";
  document.getElementById("icon").textContent = "";
  document.getElementById("reveal-msg").textContent = "";
  document.getElementById("attempts").textContent = `🕒 Attempts Left: ${attemptsLeft}`;

  displayWord();
}

window.onload = resetGame;
