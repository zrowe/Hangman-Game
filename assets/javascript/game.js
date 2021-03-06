// Initialize
var key = "";
var wins = 0;
var loses = 0;
var debug = false;

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
// Based upon: https://listverse.com/2009/12/17/top-15-greatest-composers-of-all-time/
var wordCatalog = {
    catalog: [
        ["haydn", "Franz Joseph Haydn"],
        ["handel", "George Frederick Handel"],
        ["rachmaninov", "Sergei Rachmaninov"],
        ["tchaikovsky", "Peter Ilyich Tchaikovsky"],
        ["mahler", "Gustav Mahler"],
        ["verdi", "Giuseppe Verdi"],
        ["liszt", "Johannes Brahms"],
        ["brahms", "Franz Liszt"],
        ["chopin", "Frederic Chopin"],
        ["schumann", "Robert Schumann"],
        ["schubert", "Franz Schubert"],
        ["wagner", "Richard Wagner"],
        ["beethoven", "Ludwig van Beethoven"],
        ["mozart", "Wolfgang Amadeus Mozart"],
        ["bach", "Johann Sebastian Bach"]
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
//  pass in the (flattened) key that was pressed
// updates KeynotFound and slotsRemaining

function updateWord(key) {
    if (key === "") {
        secretWord.currentWord = wordCatalog.getSecretWord(); // returns a word from dictionary
        secretWord.slotsRemaining = secretWord.currentWord.length
        secretWord.slotsDiscovered = "_"; // clear the hitList
        secretWord.slotsDiscovered = secretWord.slotsDiscovered.repeat(secretWord.currentWord.length);
        secretWord.keyNotFound = null; // 
    } else {
        if (secretWord.currentWord.includes(key)) { // check if key is in the current word.
            secretWord.slotsRemaining = 0; // Prepare to count "holes" 
            for (i = 0; i < secretWord.currentWord.length; i++) { // update the hitlist & slots remaining
                if (secretWord.currentWord.charAt(i) === key) {
                    secretWord.slotsDiscovered =
                        secretWord.slotsDiscovered.slice(0, i) +
                        key +
                        secretWord.slotsDiscovered.slice(i + 1);
                }
                if (secretWord.slotsDiscovered.charAt(i) === "_") { // this is a "hole"
                    secretWord.slotsRemaining++;
                }
            }
            secretWord.keyNotFound = false; // clear key not found
        } else {
            secretWord.keyNotFound = true; // set key not found
        }
    }
    //  TODO: updates secret word display
    var paddedSlots = "";
    for (i = 0; i < secretWord.slotsDiscovered.length; i++) {
        paddedSlots = paddedSlots + secretWord.slotsDiscovered[i] + " ";
    }
    document.getElementById("word").innerHTML = paddedSlots;

    if (debug) {
        console.log("updating word: " +
            secretWord.currentWord + "|" +
            secretWord.slotsRemaining + "|" +
            secretWord.slotsDiscovered + "|" +
            secretWord.keyNotFound);
    }
}

// Function to compare a bad guess (key) against bad guess list
// update the list if necessary, and return the number of guesses remaining.
// pass in the (flattened) key that was pressed.  Empty key causes initialization. 

function updateGuesses(key) {
    if (key === "") {
        guesses.missList = ""; // initialize the list of bad choices
        guesses.remaining = guesses.allowed; // initialize guesses remaining
    } else {
        if (!guesses.missList.includes(key)) { // check if key is in miss list. 
            guesses.missList = guesses.missList + key; // add key to the miss list
            guesses.remaining--; //decrement remaining
        }
    }

    // Update the letters rejected display
    document.getElementById("rejected").innerHTML = guesses.missList.split('').sort().join('');

    // Update the guesses remaining display
    document.getElementById("remaining").innerHTML = guesses.remaining;

    if (debug) {
        console.log("updating guesses: " +
            guesses.allowed + "|" +
            guesses.missList + "|" +
            guesses.remaining);
    }
    return guesses.remaining
}

function win() {
    wins++;
    var reward = wordCatalog.getReward(secretWord.currentWord);

    // Update the wins display
    document.getElementById("wins").innerHTML = wins;

    // Update the reward display
    document.getElementById("reward").innerHTML = reward;

    if (debug) {
        console.log("showing win");
        console.log("Your reward is:" + reward);
    }
}

function lose() {
    loses++;

    // Update the loses display
    document.getElementById("loses").innerHTML = loses;

    if (debug) {
        console.log("showing loss");
        console.log("you dont get a prize");
    }
}

function showInstructions() {
    if (debug) {
        console.log("showing instructions");
    }
}

function showBadChoice() {
    if (debug) { console.log("showing bad character choice"); }
}

function isLetter(key) {
    if (debug) {
        console.log("checking for isLetter");
    }
    var letters = /^[a-z]+$/;
    if (key.match(letters)) {
        return true;
    } else {
        if (debug) {
            console.log("not a letter");
        }
        return false;
    }
}

// ======================
// == Game begins Here ==
// ======================


// TODO: "ask do you want to play?"

updateWord(key = ""); // Get new secret word and initialze the secret word display
updateGuesses(key = ""); // Zero out the guess list and initialize the guess list display

document.onkeyup = function(event) { // wait for key press

    // Determine which key was pressed, make it lowercase, and set it to the userInput variable.
    var userInput = String.fromCharCode(event.which).toLowerCase();

    if (debug) { console.log("User pressed: " + userInput); }

    if (userInput === "?") {
        showInstructions();
    }
    if (userInput === ".") { // Check for end of game
        if (debug) { console.log("end game"); }
        return;
    }
    if (!isLetter(userInput)) { // Check for non-letter  
        showBadChoice();
    } else {
        updateWord(userInput); //   mash the key entered against the current word
        if (secretWord.slotsRemaining === 0) { // if you have matched all the characters, you win
            win();
            updateWord(key = ""); // Get new secret word and initialze the secret word display
            updateGuesses(key = ""); // Zero out the guess list and initialize the guess list display
        }
        if (secretWord.keyNotFound) { // Didn't win so check against guesses so far
            updateGuesses(userInput);
        }
        if (guesses.remaining === 0) { // if out of guesses, you lose
            lose();
            updateWord(key = ""); // Get new secret word and initialze the secret word display
            updateGuesses(key = ""); // Zero out the guess list and initialize the guess list display
        }
    }
};