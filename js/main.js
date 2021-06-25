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



// check: things exist, if yes load them correctly
function checkForParams() {
    //////////////////////
    /// INTEGER CHECKS  //
    //////////////////////

    // check for nMinutes
    if (typeof nMinutes === 'undefined') {
        console.log("Undefined nMinutes")
        document.getElementById("container").innerHTML = "Undefined nMinutes in config.js. Make sure to set that variable in a correct way and try again!"
        return 1
    } else {
        if (checkForBadInt(nMinutes, "nMinutes", true)) {
            return 1
        }
    }


    // check for rightAnswerPoints
    if (typeof rightAnswerPoints === 'undefined') {
        console.log("Undefined rightAnswerPoints")
        document.getElementById("container").innerHTML = "Undefined rightAnswerPoints in config.js. Make sure to set that variable in a correct way and try again!"
        return 1
    } else {
        if (checkForBadInt(rightAnswerPoints, "rightAnswerPoints", true)) {
            return 1
        }
    }


    // check for wrongAnswerPoints
    if (typeof wrongAnswerPoints === 'undefined') {
        console.log("Undefined wrongAnswerPoints")
        document.getElementById("container").innerHTML = "Undefined wrongAnswerPoints in config.js. Make sure to set that variable in a correct way and try again!"
        return 1
    } else {
        if (checkForBadInt(wrongAnswerPoints, "wrongAnswerPoints", true)) {
            return 1
        }
    }

    // check for noAnswerPoints
    if (typeof noAnswerPoints === 'undefined') {
        console.log("Undefined noAnswerPoints")
        document.getElementById("container").innerHTML = "Undefined noAnswerPoints in config.js. Make sure to set that variable in a correct way and try again!"
        return 1
    } else {
        if (checkForBadInt(noAnswerPoints, "noAnswerPoints", true)) {
            return 1
        }
    }

    // check for numberOfQuestions
    if (typeof numberOfQuestions === 'undefined') {
        console.log("Undefined numberOfQuestions")
        document.getElementById("container").innerHTML = "Undefined numberOfQuestions in config.js. Make sure to set that variable in a correct way and try again!"
        return 1
    } else {
        if (checkForBadInt(numberOfQuestions, "numberOfQuestions")) {
            return 1
        }
    }


    //////////////////////
    /// BOOLEAN CHECKS  //
    //////////////////////
    // check for showSlider
    if (typeof showSlider === 'undefined') {
        console.log("Undefined showSlider")
        document.getElementById("container").innerHTML = "Undefined showSlider in config.js. Make sure to set that variable in a correct way (true or false) and try again!"
        return 1
    } else {
        if (typeof showSlider !== 'boolean') {
            console.log("showSlider is not a boolean")
            document.getElementById("container").innerHTML = "showSlider must be a boolean (true / false value) in config.js. Make sure to set that variable in a correct way and try again!"
            return 1

        }
    }

    // check for showTimer
    if (typeof showTimer === 'undefined') {
        console.log("Undefined showTimer")
        document.getElementById("container").innerHTML = "Undefined showTimer in config.js. Make sure to set that variable in a correct way (true or false) and try again!"
        return 1
    } else {
        if (typeof showTimer !== 'boolean') {
            console.log("showTimer is not a boolean")
            document.getElementById("container").innerHTML = "showTimer must be a boolean (true / false value) in config.js. Make sure to set that variable in a correct way and try again!"
            return 1
        }
    }

    // check for showShuffleQuestions
    if (typeof showShuffleQuestions === 'undefined') {
        console.log("Undefined showShuffleQuestions")
        document.getElementById("container").innerHTML = "Undefined showShuffleQuestions in config.js. Make sure to set that variable in a correct way (true or false) and try again!"
        return 1
    } else {
        if (typeof showShuffleQuestions !== 'boolean') {
            console.log("showShuffleQuestions is not a boolean")
            document.getElementById("container").innerHTML = "showShuffleQuestions must be a boolean (true / false value) in config.js. Make sure to set that variable in a correct way and try again!"
            return 1
        }
    }


    // check for showShuffleAnswers
    // showShuffleAnswers is null
    if (typeof showShuffleAnswers === 'undefined') {
        console.log("Undefined showShuffleAnswers")
        document.getElementById("container").innerHTML = "Undefined showShuffleAnswers in config.js. Make sure to set that variable in a correct way (true or false) and try again!"
        return 1
    } else {
        // showShuffleAnswers is not a boolean
        if (typeof showShuffleAnswers !== 'boolean') {
            console.log("showShuffleAnswers is not a boolean")
            document.getElementById("container").innerHTML = "showShuffleAnswers must be a boolean (true / false value) in config.js. Make sure to set that variable in a correct way and try again!"
            return 1
        }
    }

    // check for jsonFolder
    if (typeof jsonFolder === 'undefined') {
        // jsonFolder is null
        console.log("Undefined jsonFolder")
        document.getElementById("container").innerHTML = "Undefined jsonFolder in config.js. Make sure to set that variable in a correct way and try again!"
        return 1
    } else {
        // jsonFolder is not a string
        if (typeof jsonFolder !== 'string') {
            console.log("jsonFolder is not a string")
            document.getElementById("container").innerHTML = "jsonFolder must be a string in config.js. Make sure to set that variable in a correct way and try again!"
            return 1
        } else {}
    }

    return 0

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
    // check: params must be valid
    if (checkForParams() != 0) {
        return 1
    }


    slider = document.getElementById("sliderQuestionsNumber")
    outslider = document.getElementById("sliderText")
    h3Explaination = document.getElementById("h3Explaination")

    slider.oninput = function() {
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


    // evt: cbx-quiz-version
    document.getElementById('quiz-version').onchange = function() {
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
    document.getElementById('btn-quiz-reload').onclick = function() {
        restart()
    }
    // evt: chk-shuffle-questions
    document.getElementById("chk-shuffle-questions").onclick = function() {
        shuffleQuestionMode = !shuffleQuestionMode
        restart()
    }

    // evt: chk-shuffle-answers
    document.getElementById("chk-shuffle-answers").onclick = function() {
        shuffleAnswerMode = !shuffleAnswerMode
        restart()
    }

    // evt: chk-timer enable / disable
    document.getElementById("chk-timer").onclick = function() {
        // timer handler

        timer = !timer
        timerHandler(timer)
    }

    h3Explaination.innerText = "+" + rightAnswerPoints + " for each right answer, +" + wrongAnswerPoints + " for each wrong answer, +" + noAnswerPoints + " for each no answer"

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

        console.log(Object.keys(jsonFiles)[0])

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

    timeUpd = setInterval(function() {
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
                function(response) {
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
            .catch(function(err) {
                console.log('Error:', err);
                disableComponents(path, jsonFolder)
                return 1
            });
    } else {
        fetch(jsonFolder + "/" + path)
            .then(
                function(response) {
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
            .catch(function(err) {
                console.log('Error:', err);
                disableComponents(path, jsonFolder)
                return 1
            });
    }

    return 0
}

// func: load elements in the webpage
function loadElements(questions) {
    for (i = 0; i < numberOfQuestions; i++) {
        var container = document.getElementById('container')
        var containingDiv = document.createElement("div")
        containingDiv.id = i;
        container.appendChild(containingDiv)

        var bigTable = document.createElement("table")
        bigTable.border = 1;

        bigTable.innerHTML = "<b><font color='blue'>" + (i + 1) + ". " + questions[i]['question'] + "</font></b><br>";
        containingDiv.appendChild(bigTable)

        // let's shuffle arrays together
        var answers = questions[i]['answers'];
        var replyNumber = Array.from(Array(answers.length).keys())

        // managing shuffle
        if (shuffleAnswerMode) {
            shuffle(answers, replyNumber)
        }

        // let's create our ugly table for the answer
        var uglyTable = document.createElement("table")
        uglyTable.border = 1;

        // let's calculate the right answer
        var rightAnswerText = questions[i]['correct'].charCodeAt(0) - 97 // number from letter
        rightAnswerText = replyNumber.findIndex((element) => element == rightAnswerText) // retrieve from shuffled array and save the new "correct answer" from shuffled indexes 

        // if question has source code, then renderize it into a table
        if (questions[i]['has_code'] == 1) {
            tablePre = document.createElement('table')
            tablePre.border = 2;
            preBlock = document.createElement('pre')
            preBlock.textContent = questions[i]['code'];
            tablePre.append(preBlock)
            uglyTable.append(tablePre)
        }

        // for each answer in the JSON file
        for (j = 0; j < answers.length; j++) {
            var radiobox = document.createElement('input')
            radiobox.id = 'answer' + i + "." + j;
            radiobox.type = 'radio';
            radiobox.name = 'radioBtns' + i;
            radiobox.value = replyNumber[j]

            var lblAnswer = document.createElement('label')
            lblAnswer.htmlFor = 'answer' + i + "." + j;

            // if answers_have_code == 1 *in json* then let's render our answers as code in a pre block
            if (questions[i]['answers_have_code']) {
                description = document.createElement('textarea')
                description.name = "taAnswerCode"
                description.textContent = " " + answers[j];
                description.readOnly = true;
                description.cols = 100;
                description.rows = 10
            } else {
                var description = document.createTextNode(" " + answers[j])
            }
            lblAnswer.appendChild(description)

            var newline = document.createElement('br')

            uglyTable.appendChild(radiobox)
            uglyTable.appendChild(lblAnswer)
            uglyTable.appendChild(newline)
        };

        // define radiobutton for "no answer" option
        var radiobox = document.createElement('input')
        radiobox.id = 'answer' + i + "." + j;
        radiobox.type = 'radio';
        radiobox.name = 'radioBtns' + i;
        radiobox.value = "s";
        radiobox.checked = true; // settato a true di default

        var lblAnswer = document.createElement('label')
        lblAnswer.htmlFor = 'answer' + i + "." + j;

        var description = document.createTextNode(" No answer")
        lblAnswer.appendChild(description)

        var newline = document.createElement('br')

        uglyTable.appendChild(radiobox)
        uglyTable.appendChild(lblAnswer)
        uglyTable.appendChild(newline)

        // let's add that table to our bigdiv
        containingDiv.appendChild(uglyTable)

        // let's add our hidden span containing the right answer
        var answer = document.createElement("span")
        answer.textContent = rightAnswerText
        answer.hidden = "true";
        answer.id = "span" + i;
        uglyTable.appendChild(answer)

        var newline2 = document.createElement('br')

        containingDiv.appendChild(newline2)
        container.appendChild(containingDiv)
    }
}

// func: check and calculate right, wrong or skipped answers at the end of time or if send button is pressed
function validate() {
    contSkip = 0;
    contRight = 0;
    contWrong = 0;
    score = 0;

    for (i = 0; i < numberOfQuestions; i++) {
        var buttons = document.getElementsByName("radioBtns" + i)
        var rightAnswer = document.getElementById("span" + i)
        var result = -1;
        var checked = -1;

        // disable all radiobuttons to prevent user enters more data
        for (j = 0; j < buttons.length; j++) {
            buttons[j].disabled = true;
        }

        // let's cycle our buttons
        // if last button has been selected, then the answer has been skipped
        if (buttons[buttons.length - 1].checked) {
            contSkip++
            noAnswerPoints++

            // the right answer was...
            var rightNumber = rightAnswer.textContent

            var inputElement = buttons[rightNumber];
            var lblElement = inputElement.nextElementSibling
            lblElement.style.backgroundColor = "#FFFF66";
        } else {
            // if one of the buttons contains the right answer, let's set the boolean to true
            for (j = 0; j < (buttons.length - 1); j++) { // -1 because skipped answer has already been analyzed before
                if (buttons[j].checked) {
                    checked = j; // save what the user has checked

                    if (("" + j) === rightAnswer.textContent) {
                        result = j; // if it is the right answer breaks everything!
                        break;
                    }
                }
            }

            var inputElement = buttons[checked]; // get checked element
            var lblElement = inputElement.nextElementSibling; // get its label

            if (result != -1) {
                // if it's the right answer, then color the label in green
                lblElement.style.backgroundColor = "#00FF00";

                score += rightAnswerPoints;
                contRight++;
            } else {
                // it's the wrong answer, then, color the label will be red
                lblElement.style.backgroundColor = "#FF0000";

                // the right answer was...
                var rightNumber = rightAnswer.textContent

                var inputElement = buttons[rightNumber]; // the right one is saved in "num" variable
                var lblElement = inputElement.nextElementSibling
                lblElement.style.backgroundColor = "#00FF00";

                score -= wrongAnswerPoints;
                contWrong++;
            }
        }
    }

    // results at the end of the page
    pResults = document.getElementById("results")
    pResults.innerHTML =
        "Right: <b>" + contRight + "</b>" + "<br>" +
        "Wrong: <b>" + contWrong + "</b>" + "<br>" +
        "No answer: <b>" + contSkip + "</b>" + "<br>" +
        "<b>Score: " + score + "/" + (numberOfQuestions * rightAnswerPoints) + "</b>" + "<br>";

    pResults.hidden = false;

    // set the timer to zero
    document.getElementById("timeleft").innerHTML = ""
    clearInterval(timeUpd)

    // TODO: trovare un modo migliore per fare ciò rispeto a fare un copia-incolla
    // fa un popup contenente il testo "copia" dell'innerhtml
    testoAlert = "Right:" + contRight + "\r\n" +
        "Wrong: " + contWrong + "\r\n" +
        "No answer: " + contSkip + "\r\n" +
        "Score: " + score + "/" + (numberOfQuestions * rightAnswerPoints) + "\r\n";

    document.getElementById("btn-send").style.visibility = "hidden";

    window.alert(testoAlert)
}
