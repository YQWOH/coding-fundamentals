const words = {
	animals: [
		"cat", 
		"lion",
		"tiger",
		"gorilla",
		"elephant",
		"whale",
		"dolphin",
		"bat",
		"cat",
		"dog",
		"cow",
		"sheep",
		"deer",
		"mouse",
		"rabbit",
		"squirrel",
		"horse",
		"kangaroo"
	],
	sports: [
		"football",
		"basketball",
		"hockey",
		"tennis",
		"golf",
		"cricket",
		"swimming",
		"diving",
		"cycling",
		"sailing",
		"badminton",
		"volleyball"
	],
	countries: [
		"Egypt",
		"Kenya",
		"Bangladesh",
		"Brunei",
		"Cambodia",
		"China",
		"Georgia",
		"India",
		"Indonesia",
		"Iran",
		"Iraq",
		"Israel",
		"Japan",
		"Kazakhstan",
		"Laos",
		"Malaysia",
		"Maldives",
		"Mongolia",
		"Myanmar",
		"Nepal",
		"Pakistan",
		"Philippines",
		"Russia",
		"Singapore",
		"Taiwan",
		"Thailand",
		"Turkey",
		"Uzbekistan",
		"Vietnam",
		"Austria",
		"Belgium",
		"Denmark",
		"Finland",
		"France",
		"Germany",
		"Greece",
		"Iceland",
		"Ireland",
		"Italy",
		"Moldova",
		"Netherlands",
		"Norway",
		"Poland",
		"Portugal",
		"Romania",
		"Russia",
		"Spain",
		"Sweden",
		"Switzerland",
		"Ukraine",
		"England",
		"Canada"
	]
}

let firstPage = document.querySelector(".firstPage");
let secondPage = document.querySelector(".secondPage");
let runApp = document.querySelector(".runApp");
let exitButton = document.querySelector("#exit");
let category = document.querySelector("#category")
let word = chooseWord();
let guessesLeft = 6;
let lettersGuessed = [];
let wordGuessed = [];
for (let i = 0; i < word.length; i++) {
	wordGuessed.push("_");
}
runApp.addEventListener("click", () => {
	// category = document.querySelector("#category").value;
	firstPage.classList.toggle("hidden");
	secondPage.classList.toggle("hidden");
	console.log("category: ", category);
	// chooseWord();
	word = chooseWord();
	wordGuessed = [];
	for (let i = 0; i < word.length; i++) {
		wordGuessed.push("_");
	}
	updateDisplay()
});

exitButton.addEventListener("click", () => {
	firstPage.classList.toggle("hidden");
	secondPage.classList.toggle("hidden");
});


console.log("category: ", category);

function chooseWord() {
	category = document.querySelector("#category").value;
	return words[`${category}`][Math.floor(Math.random() * words[`${category}`].length)];
}

function updateDisplay() {
	document.getElementById("word").innerText = wordGuessed.join(" ");
	document.getElementById("guesses-left").innerText = guessesLeft;
	document.getElementById("letters-guessed").innerText = lettersGuessed.join(", ");
}

function handleGuess(event) {
	event.preventDefault();
	let guessInput = document.getElementById("guess-input");
	let guess = guessInput.value.toLowerCase();
	guessInput.value = "";
	if (lettersGuessed.includes(guess)) {
		alert("You already guessed that letter!");
		return;
	}
	lettersGuessed.push(guess);
	if (word.includes(guess)) {
		for (let i = 0; i < word.length; i++) {
			if (word[i] === guess) {
				wordGuessed[i] = guess;
			}
		}
		if (!wordGuessed.includes("_")) {
			alert("You win!The word was " + word);
			resetGame();
		}
	} else {
		guessesLeft--;
		if (guessesLeft === 0) {
			alert("You lose! The word was " + word);
			resetGame();
		}
	}
	updateDisplay();
}

function resetGame() {
	word = chooseWord();
	guessesLeft = 6;
	lettersGuessed = [];
	wordGuessed = [];
	for (let i = 0; i < word.length; i++) {
		wordGuessed.push("_");
	}
	updateDisplay();
}

document.getElementById("guess-btn").addEventListener("click", handleGuess);
window.addEventListener("load", function() {
	updateDisplay();
});