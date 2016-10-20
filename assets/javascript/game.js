//use camelCase for naming everything in javascript
var entireGame = {
	wordBank: ["seller", "buyer", "investor", "landlord", "renter", "broker", "contract", "home inspection", "mortgage", "cash offer", "closing", "attorney", "full price offer", "multiple offer", "contingency", "staging"],
	currentWord: "",
	currentLetter: "",
	guessesRemaining: 13,
	//formerly made underscoresDisplayed as an array, but this separated every letter with a comma
	underscoresDisplayed: "",
	lettersGuessed: [],
	lettersGuessedInternal: [],
	lettersDisplayed: [],
	wins: 0,
	attempts: 0,
	winPercentage: 0,
	gameMessage: "",
	wordsWon: [],

	updateScore: function(){
		document.getElementById("score").innerHTML = entireGame.wins;
	},

	refreshLetterSpaces: function(){
		entireGame.underscoresDisplayed = "";
		document.getElementById("letter-spaces").innerHTML = entireGame.underscoresDisplayed;
	},

	refreshLettersGuessed: function(){
		entireGame.lettersGuessed = [];
		entireGame.lettersGuessedInternal = [];
		document.getElementById("letters-guessed").innerHTML = "???";
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
		entireGame.underscoresDisplayed = "";
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
		//document.getElementById("game-message").innerHTML = "Please press any letter.";
	},

	userGuessesLetter: function(){
		document.onkeyup = function(event){
			var userChoice = String.fromCharCode(event.keyCode).toLowerCase();
			var goodLetter = false;
			var letterAlreadyGuessed = false;
			//need to first check that the letter is not in lettersGuessed
			console.log(entireGame.lettersGuessedInternal);
			for(var i = 0; i<entireGame.lettersGuessedInternal.length; i++){
				if(userChoice===entireGame.lettersGuessedInternal[i]){
					letterAlreadyGuessed = true;
					document.getElementById("game-message").innerHTML = "You already tried that letter.";
				}
			}
			//if the letter was NOT already guessed, add to the lettersGuessedInternal array
			if(!letterAlreadyGuessed){
				entireGame.lettersGuessedInternal.push(userChoice);
			}
			console.log(entireGame.lettersGuessedInternal);
			console.log(userChoice);
			if(!letterAlreadyGuessed){
				//check if the userChoice is in the currentWord
				for(var i = 0; i<entireGame.currentWord.length; i++){
					console.log(entireGame.currentWord.charAt(i));
					console.log(userChoice);
					if(userChoice===entireGame.currentWord.charAt(i)){
						userChoice = userChoice.toUpperCase();
						console.log(entireGame.underscoresDisplayed.substring(0,i));
						console.log(userChoice);
						console.log(entireGame.underscoresDisplayed.substring(i,entireGame.underscoresDisplayed.length));
						//replace the userChoice letter as a capital letter in the
						//correct position in underscoresDisplayed
						//(need to separate underscoredDisplayed into 3 strings and then concatenate)
						entireGame.underscoresDisplayed = entireGame.underscoresDisplayed.substring(0,i) + userChoice + entireGame.underscoresDisplayed.substring(i+1,entireGame.underscoresDisplayed.length);
						goodLetter = true;
					}
					if(goodLetter){
						document.getElementById("game-message").innerHTML = "You guessed a good letter!";
					}
				}
				//update the letter-spaces ID with the new underscoresDisplayed
				document.getElementById("letter-spaces").innerHTML = entireGame.underscoresDisplayed;
				//if userChoice is not already guessed AND not in currentWord,
				//reduce guessesRemaining
				if(!goodLetter){
					entireGame.guessesRemaining = entireGame.guessesRemaining -1;
					document.getElementById("guesses-remaining").innerHTML = entireGame.guessesRemaining;
					document.getElementById("game-message").innerHTML = "Try another letter.";
				}
				entireGame.lettersGuessed.push(" " + userChoice.toUpperCase());
				document.getElementById("letters-guessed").innerHTML = entireGame.lettersGuessed;
			}

			//check if all letters guessed are in the selected word
			//if yes, 1. message congratulates player and says try another!, 2. wins (updateScore) AND attempts increases one, 2.25 add winning word to winning-stats counter, 2.35 remove word from wordBank, 2. 5 calculate win percentage,
			//3. select a new word, 4. reset guesses to 13, 5. reset letters guessed AND lettersguessedinternal
			// var checkIfWinner= function(){
			// 	var correctLetters = 0;
			// 	for(var i = 0; i<entireGame.currentWord.length; i++){
			// 		if(userChoice===entireGame.currentWord.charAt(i)){
			// 			correctLetters++;
			// 		}
			// 	}
			// 	if(correctLetters===entireGame.currentWord.length){
			// 		//all winning result code here

			// 	}

			//check if guesses remaining = 0. 
			//if yes, 1. message says no more guesses, try another word, better luck!, 2. attempts increases one,  2. 5 calculate win percentage,
			//3. select a new word, 4. reset guesses to 13, 5. reset letters guessed AND lettersguessedinternal
			if(entireGame.guessesRemaining === 0){
				document.getElementById("game-message").innerHTML = "Sorry. No more guesses. Try another word. Better luck!";
				entireGame.addAttempt();
				entireGame.calculateWinPercentage();
				entireGame.selectWord();
				entireGame.guessesRemaining=13;
				document.getElementById("guesses-remaining").innerHTML = entireGame.guessesRemaining;
				entireGame.populateUnderscoresDisplayed();
				entireGame.refreshLettersGuessed();
				entireGame.fillLetterSpaces();				
			}
		}		
	}
};

function startPlaying() {
	entireGame.updateScore();
	entireGame.refreshLetterSpaces();
	entireGame.refreshLettersGuessed();
	entireGame.addAttempt();
	entireGame.calculateWinPercentage();
	entireGame.selectWord();
	console.log(entireGame.currentWord);
	entireGame.populateUnderscoresDisplayed();
	console.log(entireGame.underscoresDisplayed);
	entireGame.fillLetterSpaces();
	entireGame.userGuessesLetter();

}





//entireGame.currentLetter = String.fromCharCode(event.keyCode).toLowerCase();

//document.queryselector??

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