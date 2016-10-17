//use camelCase for naming everything in javascript
var entireGame = {wordBank:["seller","buyer","investor","landlord","renter","broker","contract","home inspection","mortgage","cash offer","closing","attorney","full price offer","multiple offer","contingency","staging"],
guessesRemaining:0,lettersGuessed:[],lettersDisplayed:0, wins:0};

//if user guesses a letter they already guessed, guessesRemaining does not decrease.
//guessesRemaining does not decrease if user selects a good letter