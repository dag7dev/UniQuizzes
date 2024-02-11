////////////
// CONFIG //
////////////
var nMinutes = 25; // 25, suggested
var correctAnswerPoints = 2
var wrongAnswerPoints = 1
var noAnswerPoints = 0
var numberOfQuestions = 40 // default number of questions that you want to show
var title = "JSQuizee"
var disclaimerText = "This is a demo! You can use this code to create your own quizzes. Check the code on GitHub!"
var infoText = "If you like this project, consider starring the repo on <a href='https://github.com/dag7dev/JSQuizee'>Github</a>!"

// CUSTOMIZABLE PARTS OF THE PAGE - SHOWS OR HIDES SOME PARTS
// if a part is disabled, then the related functionality will be disabled
var showSlider = true
var showTimer = true
var showShuffleQuestions = true
var showShuffleAnswers = true

// additional URL and description shown in header
var customLink = "https://github.com/dag7dev/UniQuizzes"
var customDescription = "Github quizzes for uni people!"

// FILES
var jsonFolder = "json" // json folder where to load your json files
var jsonFiles = { // load other quizzes
    "example.json": "Example questions"
};