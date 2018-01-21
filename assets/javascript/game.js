// Initialize
var key = "";


var secretWord = {
    currentWord: "",
    slotsRemaining: 0,
    slotsDiscovered: "",
    keyNotFound: 0
}

var guesses = {
    allowed: 10,
    remaining: 0,
    missList: ""
}


// Object for catalog of words and rewards
// Contains methods for fetching a word randomly and fetching a word's reward.
var wordCatalog = {
    catalog: [
        ["banana", "yellow"],
        ["grape", "green"],
        ["orange", "orange"],
        ["pear", "light-green"],
        ["apple", "red"],
        ["tomato", "very red"],
        ["pinapple", "rusty-yellow"],
        ["kiwi", "brown"]
    ],
    // Randomly selects a word from the word catalog  
    getSecretWord: function() {
        var word = this.catalog[Math.floor(Math.random() * this.catalog.length)][0];
        return word
    },

    // Returns the reward string for a given word.  Returns "" if word not in the catalog.
    // (there's gotta be a better way)
    getReward: function(word) {
        var str = ""
        for (var i = 0; i < this.catalog.length - 1; i++) {
            if (this.catalog[i][0] === word) {
                str = this.catalog[i][1]
                break;
            }
        }
        return str;
    }
}

// maintains secretWord Object
//	pass in the (flattened) key that was pressed

function updateWord(key) {
    if (key === "") {
        secretWord.currentWord = wordCatalog.getSecretWord(); // returns a word from dictionary
        secretWord.slotsRemaining = secretWord.currentWord.length
        secretWord.slotsDiscovered = "_"; // clear the hitList
        secretWord.slotsDiscovered = secretWord.slotsDiscovered.repeat(secretWord.currentWord.length);
        secretWord.keyNotFound = true; // set found = true (just to be thorough)
    } else {
        //		match character in the secret word
        for (i = 0; i < secretWord.currentWord.length - 1; i++ ) {
            if (key === secretWord.currentWord[i]) {
                // TODO: do something interestion
                //			update hitList (might already exist), set found = true
            } else {
                // TODO: indicate not found
                //		else, set found = false
            }
        }
    }
//	updates secret word display
//	updates slotsRemaining
console.log("updating word: " +
    secretWord.currentWord + "|" +
    secretWord.slotsRemaining + "|" +
    secretWord.slotsDiscovered + "|" +
    secretWord.keyNotFound);
return // TODO: bolean(found), integer(slotsRemaining)
}


// Function to compare a bad guess (key) against bad guess list
// update the list if necessary, and return the number of guesses remaining.
// pass in the (flattened) key that was pressed.  Empty key causes initialization. 

function updateGuesses(key) {
    //	pass in the (flattened) key that was pressed 
    if (key === "") {
        guesses.missList = ""; // initialize the list of bad choices
        guesses.remaining = guesses.allowed; // initialize guesses remaining
    } else {
        // check if key is in miss list.  if not add key to the miss list and decrement remaining.
    }
    // update the letters rejected display
    // update the guesses remaining display
    console.log("updating guesses: " +
        guesses.allowed + " " +
        guesses.missList + " " +
        guesses.remaining);
    return guesses.remaining
}

function win() {
    console.log("showing win");
    console.log("Your reward is:" + wordCatalog.getReward(secretWord.currentWord));
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

// ======================
// == Game begins Here ==
// ======================


//"ask do you want to play?"

updateWord(key = ""); // Get new secret word and initialze the secret word display
updateGuesses(key = ""); // Zero out the guess list and initialize the guess list display

document.onkeyup = function(event) { // wait for key press

    // Determine which key was pressed, make it lowercase, and set it to the userInput variable.
    var userInput = String.fromCharCode(event.which).toLowerCase();

    console.log("User pressed: " + userInput);

    if (userInput === "?") {
        showInstructions();
    }
    if (userInput === ".") { // Check for end of game
        console.log("end game");
        return;
    }
    if (!isLetter(userInput)) { // Check for non-letter  
        showBadChoice();
    } else {
        updateWord(userInput); //	mash the key entered against the current word
        if (secretWord.slotsRemaining === 0) { // if you have matched all the characters, you win
            win();
        }
        if (secretWord.keyNotFound) { // Didn't win so check against guesses so far
            updateGuesses(userInput);
        }
        if (guesses.remaining === 0) { // if out of guesses, you lose
            lose();
        }
    }
};