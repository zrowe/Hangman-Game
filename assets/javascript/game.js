function updateWord(key) {
    // maintains word Object
    //	pass in the (flattened) key that was pressed
    //	if key is null 
    //		initialize new word
    //		initialize hitList
    //		set found = null (just to be thorough)
    //	else 
    //		match character in the secret word
    //		if found: 
    //			update hitList (might already exist), set found = true
    //		else, set found = false
    //	endIf
    //	updates secret word display
    //	updates slotsRemaining
    //	returns:  bolean(found), integer(slotsRemaining)
    console.log("updating word");
}

function updateGuesses(key) {
    //	pass in the (flattened) key that was pressed 
    //		if key is null initialize guessLog
    //		updates letters typed display
    //	updates guesses remaining
    //	returns: number of guesses remaining
    console.log("updating guess");
}

function win() {
    console.log("showing win");
}

function lose() {
    console.log("showing loss");
}

function showInstructions() {
    console.log("showing instructions");
}

function showBadChoice() {
    console.log("showing bad character choice");
}

function isLetter(key) {
    console.log("checking for isLetter");
    var letters = /^[a-z]+$/;
    if (key.match(letters)) {
        return true;
    } else {
        console.log("not a letter");
        return false;
    }
}

// Initialize
var key = ""

var wordTable = {
    remaining: 0,
    keyNotFound: 0,
    hitList: "",
    word: ""
}

var guesses = {
    remaining: 0,
    guessList: ""
}


//"ask do you want to play?"

// Get new secret word and initialze the secret word display
updateWord(key = "");

// Zero out the guess list and initialize the guess list display
updateGuesses(key = "");


// wait for key press
document.onkeyup = function(event) {

    // Determine which key was pressed, make it lowercase, and set it to the userInput variable.
    var userInput = String.fromCharCode(event.which).toLowerCase();

    console.log(userInput);
    if (userInput === "?") {
        showInstructions();
    }
    // Check for end of game
    if (userInput === ".") {
    	    	console.log("end game");
        return;
    }
    // Check for non-letter    
    if (!isLetter(userInput)) {
        showBadChoice();
    } else {
        //	mash the key entered against the current word
        updateWord(userInput);
        // if you have matched all the characters, you win
        if (wordTable.remaining === 0) {
            win();
        }
        // didnt win so check against guesses so far
        if (wordTable.keyNotFound) {
            updateGuesses(userInput);
        }
        // if out of guesses, you lose
        if (guesses.remaining === 0) {
            lose();
        }
    }
};