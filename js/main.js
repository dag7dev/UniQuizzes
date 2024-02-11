// vars
var timer = true; // set timer
var shuffleQuestionMode = true // shuffle questions
var shuffleAnswerMode = true // shuffle answers

// JS Vars
var timeUpd
var pResults
var questions // questions and answers parsed from JSON
var slider
var outslider
var h3Explaination

const format = (num, places) => String(num).padStart(places, '0') // one-line: prints zeros before strings

// func: if it is a string, return true
function isString(x) {
    return Object.prototype.toString.call(x) === '[object String]';
}

// func: it creates a select box
// @params: selected if entry has been selected
function createSelectBox(selectId, optText, optValue, selected) {

    // get our select quiz-version
    var select = document.getElementById(selectId)

    // create new option element
    var opt = document.createElement('option');

    // create text node
    opt.appendChild(document.createTextNode(optText));

    // set value
    opt.value = optValue;

    selected ? opt.selected = true : opt.selected = false

    // add opt to end of select box
    select.appendChild(opt);
}

function changeAnswers() {
    numberOfQuestions = slider.value;
    restart()
}

/*  
    0: it is a normal human understandable int, 1: the variable is an int > 0 and < MAX_SAFE_INTEGER *
    @params: variable: variable to check, nameOfVar: name of that variable, allowsZero: true if you allow zero value 
    */
function checkForBadInt(variable, nameOfVar, allowsZero) {
    lowerBound = allowsZero ? -1 : 0

    // not an integer
    if (!Number.isInteger(variable)) {
        console.log(nameOfVar + " must be a number")
        document.getElementById("container").innerHTML = nameOfVar + " must be a number >= 0 in config.js. Make sure to set that variable in a correct way and try again!"
        return 1
    }

    // nMinutes it is <= 0 or > MAX_SAFE_INTEGER
    if (variable <= lowerBound || variable > Number.MAX_SAFE_INTEGER) {
        console.log(nameOfVar + " value <= 0 or value > of " + Number.MAX_SAFE_INTEGER)
        document.getElementById("container").innerHTML = nameOfVar + " must be a number >= 0 and <= than " + Number.MAX_SAFE_INTEGER + " in config.js. Make sure to set that variable in a correct way and try again!"
        return 1
    }
    return 0
}

function undefinedIntegerCheck(variable, variableName, errHtmlString, allowsZero) {
    // check for nMinutes
    if (typeof variable === 'undefined') {
        console.log("Undefined " + variableName)
        document.getElementById("container").innerHTML = errHtmlString
        return 1
    } else {
        if (checkForBadInt(variable, variableName, allowsZero)) {
            return 1
        }
    }
}

// useful for printing from stackoverflow
const varToString = varObj => Object.keys({ varObj })[0]

function undefinedBadTypeCheck(variable, expectedType, allowsZero) {
    // check for nMinutes
    if (typeof variable === 'undefined') {
        console.log("Undefined " + varToString({ variable }))
        document.getElementById("container").innerHTML = "Undefined " + varToString({ variable }) + "in config.js. Make sure to set that variable in a correct way and try again!"
        return 1
    } else {
        if (typeof variable !== expectedType) {
            console.log(varToString({ variable }) + " is not a " + varToString({ expectedType }))
            document.getElementById("container").innerHTML = varToString({ variable }) + " must be a " + expectedType + " in config.js. Make sure to set that variable in a correct way and try again!"
            return 1
        }

        // check if bad int
        if (typeof variable === "integer") {
            if (typeof allowsZero === 'undefined') allowsZero = false
            if (checkForBadInt(variable, variableName, allowsZero)) {
                return 1
            }
        }

    }
}

// check: things exist, if yes load them correctly
function checkForParams() {
    ////////////////////////
    /// INTEGRITY CHECKS  //
    ////////////////////////
    if (
        undefinedBadTypeCheck(nMinutes, "number", true) == -1 ||
        undefinedBadTypeCheck(correctAnswerPoints, "number", true) == -1 ||
        undefinedBadTypeCheck(wrongAnswerPoints, "number", true) == -1 ||
        undefinedBadTypeCheck(noAnswerPoints, "number", true) == -1 ||
        undefinedBadTypeCheck(numberOfQuestions, "number", false) == -1) {
        return 1;
    }

    if (
        undefinedBadTypeCheck(showSlider, "boolean") == -1 ||
        undefinedBadTypeCheck(showTimer, "boolean") == -1 ||
        undefinedBadTypeCheck(showShuffleQuestions, "boolean") == -1 ||
        undefinedBadTypeCheck(showShuffleAnswers, "boolean") == -1 ||
        undefinedBadTypeCheck(jsonFolder, "string") == -1) {
        return 1;
    }

    return 0

}

function getCustomLink() {
    return customLink;
}

// func: handle things related to timer (start / end timer)
function timerHandler(timer) {
    if (!showTimer) {
        timer = false
    } else {
        // if timer is disabled, then you shouldn't render anything
        if (!timer) {
            document.getElementById("end").innerHTML = "";
            document.getElementById("timeleft").innerHTML = "";

            clearInterval(timeUpd)
        } else {
            clearInterval(timeUpd)
            timeStart()
        }
    }
}

// func: initialize things, checking if each variable has everything 
function init() {

    slider = document.getElementById("sliderQuestionsNumber")
    outslider = document.getElementById("sliderText")
    h3Explaination = document.getElementById("h3Explaination")

    slider.oninput = function () {
        outslider.innerHTML = this.value;
    }


    // managing hidden elements if proper variables have been set
    // show / hide timer
    if (!showTimer) {
        document.getElementById("div-chk-timer").hidden = true
        timer = false
    }

    // show / hide slider
    if (!showSlider) {
        document.getElementById("div-slider").hidden = true
    }

    // show / hide shuffle questions
    if (!showShuffleQuestions) {
        document.getElementById("div-chk-shuffle-questions").hidden = true
        shuffleQuestionMode = false
    }

    // show / hide shuffle answers
    if (!showShuffleAnswers) {
        document.getElementById("div-chk-shuffle-answers").hidden = true
        shuffleAnswerMode = false
    }

    // check: params must be valid
    if (checkForParams() != 0) {
        return 1
    }

    // evt: cbx-quiz-version
    document.getElementById('quiz-version').onchange = function () {
        numberOfQuestions = slider.value;

        pResults = document.getElementById("results")
        pResults.hidden = true
        clearBox("container")
        clearInterval(timeUpd)

        if (buildFromJSON(this.value) == 0) {
            document.getElementById("end").innerHTML = "";

            // timer handler
            timerHandler(timer)

            document.getElementById("btn-send").style.visibility = "visible";
        }
    }

    // evt: reload-button
    document.getElementById('btn-quiz-reload').onclick = function () {
        restart()
    }
    // evt: chk-shuffle-questions
    document.getElementById("chk-shuffle-questions").onclick = function () {
        shuffleQuestionMode = !shuffleQuestionMode
        restart()
    }

    // evt: chk-shuffle-answers
    document.getElementById("chk-shuffle-answers").onclick = function () {
        shuffleAnswerMode = !shuffleAnswerMode
        restart()
    }

    // evt: chk-timer enable / disable
    document.getElementById("chk-timer").onclick = function () {
        // timer handler

        timer = !timer
        timerHandler(timer)
    }

    h3Explaination.innerText = "+" + correctAnswerPoints + " for each correct answer, +" + wrongAnswerPoints + " for each wrong answer, +" + noAnswerPoints + " for each no answer"

    // check: JSONFile exist => if not it will not load
    if (typeof jsonFiles === 'undefined' || jsonFiles.constructor != Object) {
        console.log("Undefined jsonFiles")
        document.getElementById('container').innerHTML = "Undefined jsonFiles in config.js. Make sure to set that variable in a correct way and try again!";
        clearInterval(timeUpd)
        slider.disabled = true
        document.getElementById("btn-send").hidden = true
        document.getElementById("btn-quiz-reload").disabled = true
        document.getElementById("chk-timer").disabled = true
        document.getElementById("chk-shuffle-answers").disabled = true
        document.getElementById("chk-shuffle-questions").disabled = true

        return 1

    } else {
        // default file to show at the beginning
        defaultFile = Object.keys(jsonFiles)[0]

        if (buildFromJSON(defaultFile) == 0) {
            // timer handler
            timerHandler(timer)
        }

        return 0;
    }
}

// func: restart the game
function restart() {
    pResults = document.getElementById("results")
    pResults.hidden = true
    clearBox("container")
    clearInterval(timeUpd)

    if (buildFromJSON(document.getElementById('quiz-version').value) == 0) {
        // timer handler
        timerHandler(timer)

        document.getElementById("btn-send").style.visibility = "visible";
    }
}

// func: delete a box (div)
function clearBox(elementID) {
    var div = document.getElementById(elementID)

    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }
}

// func: disable components showing a proper error message
function disableComponents(path, jsonFolder) {
    cont = document.getElementById("container")
    cont.innerHTML = "ERROR: " + path + " doesn't exist. Make sure to have a file named in this way in your \"" + jsonFolder + "\" folder."
    cont.appendChild(document.createElement('div'))
    clearInterval(timeUpd)
    document.getElementById("timeleft").innerHTML = ""
    document.getElementById("btn-send").disabled = true
    document.getElementById("btn-send").hidden = true
}

// func: set a countdown
function timeStart() {
    var countDownDate = new Date()
    countDownDate.setMinutes(countDownDate.getMinutes() + nMinutes)

    timeUpd = setInterval(function () {
        var now = new Date().getTime()
        var timeleft = countDownDate - now;

        // calcola minuti e secondi rimasti
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000)
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60))

        // mostra quanto tempo manca all'inizio
        document.getElementById("timeleft").innerHTML = format(minutes, 2) + ":" + format(seconds, 2)

        // tempo scaduto
        if (timeleft < 0) {
            clearInterval(timeUpd)
            document.getElementById("timeleft").innerHTML = ""
            document.getElementById("end").innerHTML = "TEMPO SCADUTO!";

            validate()
        }
    }, 1000)
}

// pure shuffle --> https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function pureShuffle(array) {
    var currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

// func: shuffle two arrays with the same shuffled order
function shuffle(obj1, obj2) {
    var index = obj1.length;
    var rnd, tmp1, tmp2;

    while (index) {
        rnd = Math.floor(Math.random() * index)
        index -= 1;
        tmp1 = obj1[index];
        tmp2 = obj2[index];
        obj1[index] = obj1[rnd];
        obj2[index] = obj2[rnd];
        obj1[rnd] = tmp1;
        obj2[rnd] = tmp2;
    }
}

// func: parse JSON if json loads successfully + build the webpage
function buildFromJSON(path) {
    // if file exists load it, if not just exit

    // determining if I need to shuffle questions or not
    if (shuffleQuestionMode) {
        fetch(jsonFolder + "/" + path)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Status Code: ' +
                            response.status);
                        disableComponents(path, jsonFolder)
                        return 1;
                    }

                    // parse my json
                    response.json().then(data => questions = data)
                        .then(() => numberOfQuestions > questions.length ? numberOfQuestions = questions.length : numberOfQuestions = numberOfQuestions)
                        .then(() => questions = pureShuffle(questions)) // randomize questions
                        .then(() => loadElements(questions)) // build the webpage
                }
            )
            .catch(function (err) {
                console.log('Error:', err);
                disableComponents(path, jsonFolder)
                return 1
            });
    } else {
        fetch(jsonFolder + "/" + path)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        disableComponents(path, jsonFolder)
                        return 1;
                    }

                    response.json().then(data => questions = data)
                        // this line fixes the number of question if the number of questions you want to show is greater than the total number of questions
                        .then(() => numberOfQuestions > questions.length ? numberOfQuestions = questions.length : numberOfQuestions = numberOfQuestions)
                        .then(() => questions = questions) // do not randomize
                        .then(() => loadElements(questions))
                }
            )
            .catch(function (err) {
                console.log('Error:', err);
                disableComponents(path, jsonFolder)
                return 1
            });
    }

    return 0
}
// func: load elements in the webpage
function loadElements(questions) {
    var container = document.getElementById('container');

    for (i = 0; i < numberOfQuestions; i++) {
        var card = document.createElement('div');
        card.classList.add('my-4', 'p-4', 'card', 'rounded');
        container.appendChild(card);

        const questionHeader = document.createElement('div');
        const boldText = document.createElement('b');
        const questionText = document.createTextNode(`${i + 1}. ${questions[i].question}`);
        boldText.style.color = 'blue';
        boldText.appendChild(questionText);
        questionHeader.appendChild(boldText);
        questionHeader.id = 'question';
        card.appendChild(questionHeader);
        
        // image to show, if any
        if (questions[i]['img'] !== undefined && questions[i]['img'].length > 0) {
            var img = document.createElement("img")

            // TODO: this wont work for JPG
            // if a file already have png extension dont add png
            if (!questions[i]['img'].includes(".png")) {
                questions[i]['img'] = questions[i]['img'] + ".png"
            }

            img.src = "img/" + questions[i]['img'].toString();
            img.style.maxWidth = "50%";
            card.appendChild(img)
        }

        // let's shuffle arrays together
        var answers = questions[i]['answers'];
        var replyNumber = Array.from(Array(answers.length).keys())

        // managing shuffle
        if (shuffleAnswerMode) {
            shuffle(answers, replyNumber)
        }

        // let's calculate the correct answer
        var correctAnswerText = questions[i]['correct'].toLowerCase().charCodeAt(0) - 97 // number from letter
        correctAnswerText = replyNumber.findIndex((element) => element == correctAnswerText) // retrieve from shuffled array and save the new "correct answer" from shuffled indexes 

        // if question has source code, then renderize it into a div
        if (questions[i]['code'] !== undefined && questions[i]['code'].length > 0) {
            var codeDiv = document.createElement('div');
            codeDiv.innerHTML = "<pre>" + questions[i]['code'] + "</pre>";
            card.appendChild(codeDiv);
        }

        // for each answer in the JSON file
        for (j = 0; j < answers.length; j++) {
            var answerContainer = document.createElement('div');
            answerContainer.classList.add('form-check');

            var radiobox = document.createElement('input');
            radiobox.classList.add('form-check-input');
            radiobox.id = 'answer' + i + "." + j;
            radiobox.type = 'radio';
            radiobox.name = 'radioBtns' + i;
            radiobox.value = replyNumber[j];

            var lblAnswer = document.createElement('label');
            lblAnswer.classList.add('form-check-label');
            lblAnswer.htmlFor = 'answer' + i + "." + j;

            // if answers_have_code == 1 *in json* then let's render our answers as code in a pre block
            if (questions[i]['answers_have_code']) {
                var description = document.createElement('textarea')
                description.name = "taAnswerCode"
                description.textContent = " " + answers[j];
                description.readOnly = true;
                description.cols = 100;
                description.rows = 10;

                // Textarea must fits into the parent
                description.style.width = "100%";

            } else {
                var description = document.createTextNode(" " + answers[j])
            }
            lblAnswer.appendChild(description);

            answerContainer.appendChild(radiobox);
            answerContainer.appendChild(lblAnswer);
            card.appendChild(answerContainer);
        };

        // define radiobutton for "no answer" option
        var noAnswerContainer = document.createElement('div');
        noAnswerContainer.classList.add('form-check');

        var radiobox = document.createElement('input');
        radiobox.classList.add('form-check-input');
        radiobox.id = 'answer' + i + ".noAnswer";
        radiobox.type = 'radio';
        radiobox.name = 'radioBtns' + i;
        radiobox.value = "s";
        radiobox.checked = true; // settato a true di default

        var lblAnswer = document.createElement('label');
        lblAnswer.classList.add('form-check-label');
        lblAnswer.htmlFor = 'answer' + i + ".noAnswer";

        var description = document.createTextNode(" No answer");
        lblAnswer.appendChild(description);

        noAnswerContainer.appendChild(radiobox);
        noAnswerContainer.appendChild(lblAnswer);
        card.appendChild(noAnswerContainer);

        // let's add our hidden span containing the correct answer
        var answer = document.createElement('span');
        answer.textContent = correctAnswerText;
        answer.hidden = true;
        answer.id = 'span' + i;
        card.appendChild(answer);

        var newline = document.createElement('br');

        card.appendChild(newline);
        container.appendChild(card);
    }
}

// func: check and calculate correct, wrong or skipped answers at the end of time or if send button is pressed
function validate() {
    contSkip = 0;
    contCorrect = 0;
    contWrong = 0;
    score = 0;

    for (i = 0; i < numberOfQuestions; i++) {
        var buttons = document.getElementsByName("radioBtns" + i)
        var correctAnswer = document.getElementById("span" + i)
        var result = -1;
        var checked = -1;

        // disable all radiobuttons to prevent user enters more data
        for (j = 0; j < buttons.length; j++) {
            buttons[j].onclick = function() {
                return false; // prevent further changes
            };
        }

        // let's cycle our buttons
        // if last button has been selected, then the answer has been skipped
        if (buttons[buttons.length - 1].checked) {
            contSkip++
            noAnswerPoints++

            // the correct answer was...
            var correctNumber = correctAnswer.textContent

            var inputElement = buttons[correctNumber];
            var lblElement = inputElement.nextElementSibling
            lblElement.style.backgroundColor = "#FFFF66";
            if(lblElement.firstChild.nodeName === "TEXTAREA") {
                lblElement.firstChild.style.backgroundColor = "#FFFF66";
            }

        } else {
            // if one of the buttons contains the correct answer, let's set the boolean to true
            for (j = 0; j < (buttons.length - 1); j++) { // -1 because skipped answer has already been analyzed before
                if (buttons[j].checked) {
                    checked = j; // save what the user has checked

                    if (("" + j) === correctAnswer.textContent) {
                        result = j; // if it is the correct answer breaks everything!
                        break;
                    }
                }
            }

            var inputElement = buttons[checked]; // get checked element
            var lblElement = inputElement.nextElementSibling; // get its label

            if (result != -1) {
                // if it's the correct answer, then color the label in green
                lblElement.style.backgroundColor = "#00FF00";
                if(lblElement.firstChild.nodeName === "TEXTAREA") {
                    lblElement.firstChild.style.backgroundColor = "#00FF00";
                }
                score += correctAnswerPoints;
                contCorrect++;
            } else {
                // it's the wrong answer, then, color the label will be red
                lblElement.style.backgroundColor = "#FF0000";
                if(lblElement.firstChild.nodeName === "TEXTAREA") {
                    lblElement.firstChild.style.backgroundColor = "#FF0000";
                }


                // the correct answer was...
                var correctNumber = correctAnswer.textContent

                var inputElement = buttons[correctNumber]; // the correct one is saved in "num" variable
                var lblElement = inputElement.nextElementSibling
                lblElement.style.backgroundColor = "#00FF00";
                if(lblElement.firstChild.nodeName === "TEXTAREA") {
                    lblElement.firstChild.style.backgroundColor = "#00FF00";
                }

                score -= wrongAnswerPoints;
                contWrong++;
            }
        }
    }

    // results at the end of the page
    pResults = document.getElementById("results");
    pResults.innerHTML =
        "Correct: <b>" + contCorrect + "</b>" + "<br>" +
        "Wrong: <b>" + contWrong + "</b>" + "<br>" +
        "No answer: <b>" + contSkip + "</b>" + "<br>" +
        "<b>Score: " + score + "/" + (numberOfQuestions * correctAnswerPoints) + "</b>" + "<br>";

    pResults.hidden = false;

    // TODO: trovare un modo migliore per fare ciò rispeto a fare un copia-incolla
    // fa un popup contenente il testo "copia" dell'innerhtml
    document.getElementById("btn-send").style.visibility = "hidden";
    
    // Classic mode no bootstrap alert
    if (document.getElementById('chk-toggle-bootstrap').checked) {
        // Display results in the Bootstrap modal
        var resultModalBody = document.getElementById("resultModalBody");
        resultModalBody.innerHTML = pResults.innerHTML;

        var resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
        resultModal.show();

        // set the timer to zero
        document.getElementById("timeleft").innerHTML = "";
        clearInterval(timeUpd);
    }
    else {
        // Display results in the classic modal
        alert(pResults.innerText);
    }
}
