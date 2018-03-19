// Question constructor

class TriviaQuestion {
    constructor(questionText, answerOne, answerTwo, answerThree, answerFour, gif) {
        this.questionText = questionText;
        this.answerOptions = [
            answerOne,
            answerTwo,
            answerThree,
            answerFour
        ];
        this.correctAnswer = answerOne;
        this.gif = gif;
    }
}

// Game properties and methods

var triviaGame = {
    
    generateQuestions: function() {   
        this.questionBank.push(
            new TriviaQuestion(
                "What is the name of Ginny Weasley's pet Pygmy Puff?", 
                "Arnold", 
                "Snuffles", 
                "Steven", 
                "Bobtail", 
                "./assets/img/pygmy-puff.gif"
            ),

            new TriviaQuestion(
                "Which wizarding school does Viktor Krum attend?", 
                "Durmstrang", 
                "Hogwarts", 
                "Beauxbatons", 
                "Ilvermorny", 
                "./assets/img/viktor-krum.gif"
            ),
    
            new TriviaQuestion(
                "Which Hogwarts house did Moaning Myrtle belong to?", 
                "Ravenclaw", 
                "Gryffindor", 
                "Hufflepuff", 
                "Slytherin", 
                "./assets/img/moaning-myrtle.gif"
            ),

            new TriviaQuestion(
                "Hermione's cat, Crookshanks, is half what magical creature?", 
                "Kneazle", 
                "Niffler", 
                "Hippogriff", 
                "Hinkypunk", 
                "./assets/img/crookshanks.gif"
            ),

            new TriviaQuestion(
                "What violent spell does Harry learn from the Half-Blood Prince's textbook?", 
                "Sectumsempra", 
                "Levicorpus", 
                "Scourgify", 
                "Densaugeo", 
                "./assets/img/sectumsempra.gif"
            ),

            new TriviaQuestion(
                "Which of these dragon breeds was NOT an opponent in the Triwizard Tournament?", 
                "Norwegian Ridgeback", 
                "Hungarian Horntail", 
                "Chinese Fireball", 
                "Swedish Short-Snout", 
                "./assets/img/norwegian-ridgeback.gif"
            ),

            new TriviaQuestion(
                "What type of wood was Harry's wand made of?", 
                "Holly", 
                "Yew", 
                "Hawthorn", 
                "Elder", 
                "./assets/img/harry-wand.gif"
            ),

            new TriviaQuestion(
                "What does S.P.E.W. stand for?", 
                "Society for the Promotion of Elfish Welfare", 
                "Society for the Promotion of Equality for Witches", 
                "Society for the Partnership of Elves and Wizards", 
                "Society for the Protection of Every Wizard", 
                "./assets/img/dobby.gif"
            ),

            new TriviaQuestion(
                "Who wrote 'Hogwarts: A History'?", 
                "Bathilda Bagshot", 
                "Miranda Goshawk", 
                "Inigo Imago", 
                "Cornelius Agrippa", 
                "./assets/img/hogwarts-a-history.gif"
            ),

            new TriviaQuestion(
                "What Patronus form does Luna Lovegood have?", 
                "Hare", 
                "Otter", 
                "Dolphin", 
                "Hedgehog", 
                "./assets/img/luna-lovegood.gif"
            ),
        );
    },
    
    questionBank: [],

    currentQuestion: {},

    timeRemaining: 30,
    
    numberCorrect: 0,

    numberIncorrect: 0,

    numberUnanswered: 0,

    startGame: function() {
        this.generateQuestions();
        this.selectQuestion();
    },

    selectQuestion: function() {
        var randomQuestionNumber = Math.floor(Math.random() * this.questionBank.length);
        this.currentQuestion = this.questionBank[randomQuestionNumber];
        
        this.questionBank.splice(randomQuestionNumber, 1);

        this.displayQuestion();
    },

    displayQuestion: function() {
        $("#question").text(this.currentQuestion.questionText);

        while (this.currentQuestion.answerOptions.length > 0) {
            var randomAnswerNumber = Math.floor(Math.random() * this.currentQuestion.answerOptions.length);
            $("<div>").text(this.currentQuestion.answerOptions[randomAnswerNumber]).appendTo($("#answer-options"));
            this.currentQuestion.answerOptions.splice(randomAnswerNumber, 1);
        }

        this.startTimer();
    },

    startTimer: function() {
        $("#timer").text("Time Remaining: " + this.timeRemaining);
        
        questionTimer = setInterval(decreaseTimeRemaining, 1000);
    },

    checkAnswer: function(answer) {
        var guessIsCorrect = false;

        if (answer === this.currentQuestion.correctAnswer) {
            guessIsCorrect = true;
            this.numberCorrect++;
            stopTimer();
            this.displayResult(guessIsCorrect);
        } else {
            this.numberIncorrect++;
            stopTimer();
            this.displayResult(guessIsCorrect);
        }
    },

    displayResult: function(guessIsCorrect) {
        $("#question, #answer-options, #timer").empty();
        
        if (guessIsCorrect) {
            $("#guess-evaluation").text("You got it!");
        } else if (this.timeRemaining === 0) {
            $("#guess-evaluation").text("Time's up!");
            this.displayCorrectAnswer();
        } else {
            $("#guess-evaluation").text("Nope!");
            this.displayCorrectAnswer();
        }

        $("#question-gif").attr({"src":this.currentQuestion.gif, "alt":this.currentQuestion.correctAnswer});

        setTimeout(nextQuestion, 1000 * 5);
    },

    displayCorrectAnswer: function() {
        $("#correct-answer").text("The answer was " + this.currentQuestion.correctAnswer + ".");
    },

    resetGame: function() {
        this.timeRemaining = 30;
        $("#guess-evaluation, #correct-answer").empty();
        $("#question-gif").attr({"src":"#", "alt":""})
    },

    endGame: function() {
        this.resetGame();

        $("#number-correct").text(this.numberCorrect);
        $("#number-incorrect").text(this.numberIncorrect);
        $("#number-unanswered").text(this.numberUnanswered);
        $("#game-stats").show();
    },

    restartGame: function() {
        this.numberCorrect = 0;
        this.numberIncorrect = 0;
        this.numberUnanswered = 0;
        $("#game-stats").hide();

        this.startGame();
    }
}

// Event handlers

$("#start-button").on("click", function() {
    $("#start-button").hide();
    triviaGame.startGame();
})

$("#answer-options").on("click", "div", function(userClick) {
    var userChoice = userClick.target.textContent;
    triviaGame.checkAnswer(userChoice);
})

$("#restart-button").on("click", function() {
    triviaGame.restartGame();
})

// Timeouts and intervals

var questionTimer;

var decreaseTimeRemaining = function() {
    triviaGame.timeRemaining--;
    $("#timer").text("Time Remaining: " + triviaGame.timeRemaining);

    if (triviaGame.timeRemaining === 0) {
        triviaGame.numberUnanswered++;
        stopTimer();
        triviaGame.displayResult();
    }
}

var stopTimer = function() {
    clearInterval(questionTimer)
}

var nextQuestion = function() {
    if (triviaGame.questionBank.length === 0) {
        triviaGame.endGame();
    } else {
        triviaGame.resetGame();
        triviaGame.selectQuestion();
    }
}