//use camelCase for naming everything in javascript
var entireGame = {
	wordBank: ["seller", "buyer", "investor", "landlord", "renter", "broker", "contract", "home inspection", "mortgage", "cash offer", "closing", "attorney", "full price offer", "multiple offer", "contingency", "staging"],
	currentWord: "",
	currentLetter: "",
	guessesRemaining: 13,
	//formerly made underscoresDisplayed as an array, but this separated every letter with a comma
	underscoresDisplayed: "",
	lettersGuessed: [],
	lettersGuessedIncorrect:[],
	//lettersguessed incorrect are the same as lettersDisplayed. May
	//need to delete the lettersDisplayed property
	lettersDisplayed: [],
	wins: 2,
	attempts: 0,
	winPercentage: 0,
	wordsWon: [],

	updateScore: function(){
		document.getElementById("score").innerHTML = entireGame.wins;
	},

	refreshLetterSpaces: function(){
		entireGame.underscoresDisplayed = "";
		document.getElementById("letter-spaces").innerHTML = entireGame.underscoresDisplayed;
	},

	addAttempt: function(){
		entireGame.attempts ++;
	},

	calculateWinPercentage: function(){
		entireGame.winPercentage = (entireGame.wins / entireGame.attempts) * 100;
		entireGame.winPercentage = entireGame.winPercentage.toFixed(2);
		document.getElementById("attempts-win-percentage").innerHTML = entireGame.attempts + " | " + entireGame.winPercentage + "%";		
	},

	selectWord: function(){
		//Math.floor(x) returns the value of x rounded down to its nearest integer
		//Math.random() returns a random number between 0 (inclusive), and 1 (exclusive)
		entireGame.currentWord = entireGame.wordBank[Math.floor(Math.random() * entireGame.wordBank.length)];
	},

	populateUnderscoresDisplayed: function(){
		//use currentWord.length-1 because the last letter will be a letter
		//with no space afterwards
		for(var i = 0; i < entireGame.currentWord.length-1; i++){
			function isLetter(check){
				//make sure for what you are checking will be in [a-z]
				return check.match(/[a-z]/gi);
			}
			if(isLetter(entireGame.currentWord.charAt(i))){
				entireGame.underscoresDisplayed += "_";
			}
			else{
				//remember: spaces in html and javascript are different.
				//instead of "  ", you need to define your spaces as &nbsp;
				entireGame.underscoresDisplayed += "&nbsp;";
			}
		}		
		entireGame.underscoresDisplayed += "_";
	},

	fillLetterSpaces: function(){
		document.getElementById("letter-spaces").innerHTML = entireGame.underscoresDisplayed;
	},

	userGuessesLetter: function(){
		document.onkeyup = function(event){
			var userChoice = String.fromCharCode(event.keyCode).toLowerCase();
			var goodLetterCount = 0;
		}
		for(var i = 0; i<entireGame.currentWord.length; i++){
			if(userChoice===entireGame.currentWord.charAt(i)){
				entireGame.underscoresDisplayed.charAt(i) = userChoice.toUpperCase();
				document.getElementById("letter-spaces").innerHTML = entireGame.underscoresDisplayed;
				goodLetterCount ++;
			}
		}
		if(goodLetterCount===0){
			entireGame.guessesRemaining = entireGame.guessesRemaining -1;
			document.getElementById("guesses-remaining").innerHTML = entireGame.guessesRemaining;
		}

		entireGame.lettersGuessed.push("userChoice.toUpperCase()");
		document.getElementById("letters-guessed").innerHTML = entireGame.lettersGuessed;
	}
};

function startPlaying() {
	entireGame.updateScore();
	entireGame.refreshLetterSpaces();
	entireGame.addAttempt();
	entireGame.calculateWinPercentage();
	entireGame.selectWord();
	console.log(entireGame.currentWord);
	entireGame.populateUnderscoresDisplayed();
	console.log(entireGame.underscoresDisplayed);
	console.log(document.getElementById("letter-spaces"));
	entireGame.fillLetterSpaces();
	//entireGame.userGuessesLetter();

}
		document.onkeyup = function(event){
			var userChoice = String.fromCharCode(event.keyCode).toLowerCase();
			var goodLetterCount = 0;
		}
		console.log(userChoice);




//entireGame.currentLetter = String.fromCharCode(event.keyCode).toLowerCase();

// if(word is complete){
// 	entireGame.wins++;
// 	document.querySelector("#score").innerHTML = wins;
// }




//if user guesses a letter they already guessed, guessesRemaining does not decrease.
//guessesRemaining does not decrease if user selects a good letter

//document.queryselector??
// document.onkeyup = function(event) {
// 	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();

		// // Taking the tallies and displaying them in HTML
		// var html = "<p>Press r, p or s to start playing</p>" +
		// "<p>wins: " + 
		// wins + 
		// "</p>" +
		// "<p>losses: " + 
		// losses + 
		// "</p>" +
		// "<p>ties: " + 
		// ties + 
		// "</p>";


// parseInt(var) = turns the var into a number (eg as 
// obtained from a prompt)

// arrayName.indexOf("elementInTheArray") = returns the
// index number of that element


	// for (var i=0; i<myFarm.length; i++){
	// 	var firstLetter = myFarm[i].charAt(0);
	// 	if (firstLetter =="c"){
	// 		console.log("This animal's name starts with a c!");
	// 	}
	// 	else if (firstLetter == "o"){
	// 		console.log("This animal's name starts with a o!");
	// 	}
	// 	else{
	// 		console.log("This animal does not start with a c or o.");
	// 	}
	// }

// push("element") = adds elements to the end of an array
// pop("element") = deletes the last element in an array

		// function vowelChecker(x){
		// 	var wordSplit = x.split("");
		// 	var firstLetter = wordSplit[0];
		// 	if(firstLetter.toLowerCase() ==="a" || firstLetter.toLowerCase() ==="e" || firstLetter.toLowerCase()==="i" || firstLetter.toLowerCase() ==="o" || firstLetter.toLowerCase()==="u"){
		// 		console.log("the first letter in " + x + " is a vowel.")
		// 	}
		// 	else{
		// 		console.log("the first letter in " + x + " is NOT a vowel.")				
		// 	}
		// }

		//firstCharacter = x.toLowerCase().charAt(0);

//use a switch statement??