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
        questionOne = new TriviaQuestion("q1", "1", "2", "3", "4", "./assets/img/test.gif"),
        questionTwo = new TriviaQuestion("q2", "1", "2", "3", "4", "./assets/img/test.gif"),
        questionThree = new TriviaQuestion("q3", "1", "2", "3", "4", "./assets/img/test.gif")
        this.questionBank.push(questionOne, questionTwo, questionThree);
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
        $("#question-gif").attr({"src":"", "alt":""})
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