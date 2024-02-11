////////////
// CONFIG //
////////////
var nMinutes = 25; // 25, suggested
var correctAnswerPoints = 2
var wrongAnswerPoints = 1
var noAnswerPoints = 0
var numberOfQuestions = 40 // default number of questions that you want to show
var title = "UniQuizzes"
var disclaimerText = "Il simulatore non viene aggiornato in automatico. Dare un'occhiata al sorgente su Github, e in caso proporre nuove modifiche!"
var infoText = "If you like this project, consider starring the repo on <a href='https://github.com/dag7dev/UniQuizzes'>Github</a>!"

// CUSTOMIZABLE PART OF THE PAGE - SHOWS OR HIDES SOME PARTS
// if a part is disabled, then the related functionality will be disabled
var showSlider = true
var showTimer = true
var showShuffleQuestions = true
var showShuffleAnswers = true

// additional URL and description shown in header
var customLink = "https://github.com/dag7dev/UniQuizzes"
var customDescription = "Stars the repo"

// FILES
var jsonFolder = "json" // json folder where to load your json files
var jsonFiles = { // load other quizzes
    "so1 NOFILE.json": "SO1 2024",
    "so1.json": "SO1",
    "so2.json": "SO2",
    "swInedite.json": "SW - Inedite",
    "OLD_so1.json": "Archivio SO1",
    "2022_FDS.json": "FDS 2022",
    "so2mz.json": "SO2 2023",
    "file.json": "Cloud Computing"
};
