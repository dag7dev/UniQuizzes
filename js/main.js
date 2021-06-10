// VARIABILI
var nMinutes = 25; // per debuggare con più rapidità: deve stare a 25 normalmente
var timeUpd // poi le altre funzioni non lo vedono
var pResults // poi le altre funzioni non lo vedono
var shuffleQuestionMode = true // mescola le domande
var shuffleAnswerMode = true // mescola le risposte
var timer = true;

const format = (num, places) => String(num).padStart(places, '0') // funzione one-line figa che permette di fare il padding delle stringhe con gli zeri

var numberOfQuestions = 40 // numero domande che si vuole mostrare
var questions // contiene tutte le domande e le risposte (parsate dal json)

/////////////////////
// EVENT LISTENERS //
/////////////////////

var slider = document.getElementById("sliderQuestionsNumber");
var outslider = document.getElementById("sliderText");

function changeAnswers() {
    numberOfQuestions = slider.value;
    restart()
}

slider.oninput = function() {
    outputslider.innerHTML = this.value;
}

// event listener sulla combobox
document.getElementById('so-quiz-version').onchange = function() {
    pResults = document.getElementById("risultati")
    pResults.hidden = true
    clearBox("container")
    clearInterval(timeUpd)
    buildJSON(this.value)
    document.getElementById("end").innerHTML = "";
    timeStart()
    document.getElementById("btnInvia").style.visibility = "visible";
}

// event listener sul button
document.getElementById('btn-quiz-reload').onclick = function() {
    restart()
}

// restart the game
function restart() {
    pResults = document.getElementById("risultati")
    pResults.hidden = true
    clearBox("container")
    clearInterval(timeUpd)
    buildJSON(document.getElementById('so-quiz-version').value)
    document.getElementById("end").innerHTML = "";
    timeStart()
    document.getElementById("btnInvia").style.visibility = "visible";
}

// event listener domande casuali
document.getElementById("chk-shuffle-questions").onclick = function() {
    shuffleQuestionMode = !shuffleQuestionMode
    restart()
}

// event listener domande casuali
document.getElementById("chk-shuffle-answers").onclick = function() {
    shuffleAnswerMode = !shuffleAnswerMode
    restart()
}

// event listener domande casuali
document.getElementById("chk-timer").onclick = function() {
    timer = !timer

    if (!timer) {
        // ciò viene fatto altrimenti il timer continua
        document.getElementById("timeleft").innerHTML = ""
        clearInterval(timeUpd)
    } else {
        timeStart()
    }
}

// cancella il contenuto di un div, container nel nostro caso
function clearBox(elementID) {
    var div = document.getElementById(elementID)

    while (div.firstChild) {
        div.removeChild(div.firstChild)
    }
}

// setta un conto alla rovescia
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

// mescola due array con lo stesso "ordinamento casuale"
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

// builda i container col json
function buildJSON(path) {
    // parsing del json
    if (shuffleQuestionMode) {
        fetch('json/' + path)
            .then(res => res.json())
            .then(data => questions = data)
            .then(() => questions = pureShuffle(questions)) // randomizziamo l'ordine delle domande
            .then(() => loadElements(questions)) // buildiamo le varie parti della pagina web
    } else {
        fetch('json/' + path)
            .then(res => res.json())
            .then(data => questions = data)
            .then(() => questions = questions) // non randomizzo
            .then(() => loadElements(questions)) // buildiamo le varie parti della pagina web
    }
}

// carichiamo gli elementi nella pagina web
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

        // shufflo gli array insieme (risposte casuali)
        var replies = questions[i]['replies'];

        // questo array mi serve perchè altrimenti avrei dovuto cambiare il json da capo
        // (sebbene sarebbe stato più comodo avere un numero abbiamo delle lettere, quindi dobbiamo convertirle)
        var replyNumber = Array.from(Array(replies.length).keys())

        // casuale
        if (shuffleAnswerMode) {
            shuffle(replies, replyNumber)
        }

        // tabella per la risposta
        var uglyTable = document.createElement("table")
        uglyTable.border = 1;

        // ora mi calcolo la risposta giusta
        var rightAnswerText = questions[i]['correct'].charCodeAt(0) - 97 // prima mi calcolo il numero dalla lettera
        rightAnswerText = replyNumber.findIndex((element) => element == rightAnswerText) // lo cerco nell'array delle risposte shufflate e mi salvo l'indice "shufflato" 

        // se c'è codice renderizziamolo in opportuna tabella e blocco pre
        if (questions[i]['has_code'] == 1) {
            tablePre = document.createElement('table')
            tablePre.border = 2;
            preBlock = document.createElement('pre')
            preBlock.textContent = questions[i]['code'];
            tablePre.append(preBlock)
            uglyTable.append(tablePre)
        }

        // per ogni risposta del json (le varie scelte)
        for (j = 0; j < replies.length; j++) {
            var radiobox = document.createElement('input')
            radiobox.id = 'risposta' + i + "." + j;
            radiobox.type = 'radio';
            radiobox.name = 'radioBtns' + i;
            radiobox.value = replyNumber[j]

            var lblAnswer = document.createElement('label')
            lblAnswer.htmlFor = 'risposta' + i + "." + j;

            // se il flag nel json è 1, allora renderizzamelo come blocco pre 
            if (questions[i]['answers_have_code']) {
                description = document.createElement('textarea')
                description.name = "taAnswerCode"
                description.textContent = " " + replies[j];
                description.readOnly = true;
                description.cols = 100;
                description.rows = 10
            } else {
                var description = document.createTextNode(" " + replies[j])
            }
            lblAnswer.appendChild(description)

            var newline = document.createElement('br')

            uglyTable.appendChild(radiobox)
            uglyTable.appendChild(lblAnswer)
            uglyTable.appendChild(newline)
        };

        // definisco radiobutton della risposta saltata
        var radiobox = document.createElement('input')
        radiobox.id = 'risposta' + i + "." + j;
        radiobox.type = 'radio';
        radiobox.name = 'radioBtns' + i;
        radiobox.value = "s";
        radiobox.checked = true; // settato a true di default

        var lblAnswer = document.createElement('label')
        lblAnswer.htmlFor = 'risposta' + i + "." + j;

        var description = document.createTextNode(" Nessuna risposta")
        lblAnswer.appendChild(description)

        var newline = document.createElement('br')

        uglyTable.appendChild(radiobox)
        uglyTable.appendChild(lblAnswer)
        uglyTable.appendChild(newline)

        // aggiungo la tabella al div gigante
        containingDiv.appendChild(uglyTable)

        // aggiungo lo span nascosto della risposta giusta
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

// valida le risposte inserite a seguito della pressione del tasto invia
// o della scadenza del popup
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

        // disattivo i bottoni
        for (j = 0; j < buttons.length; j++) {
            buttons[j].disabled = true;
        }

        // ciclo i bottoni
        // se l'ultimo bottone è stato selezionato allora è stata skippata la risposta
        if (buttons[buttons.length - 1].checked) {
            contSkip++;

            // quella giusta era
            var num = rightAnswer.textContent

            var inputElement = buttons[num];
            var lblElement = inputElement.nextElementSibling
            lblElement.style.backgroundColor = "#00FF00";


        } else {
            // se uno dei bottoni contiene la risposta giusta allora setto il booleano a true
            for (j = 0; j < (buttons.length - 1); j++) { // -1 perché tanto l'ultimo l'ho già visto e contiene la risposta saltata
                if (buttons[j].checked) {
                    checked = j; // salvo cosa ho checkato

                    if (("" + j) === rightAnswer.textContent) {
                        result = j; // salvo se ho beccato quello giusto o no
                        break;
                    }
                }
            }

            var inputElement = buttons[checked]; // prendo l'elemento checkato
            var lblElement = inputElement.nextElementSibling; // prendo la label associata

            if (result != -1) {
                // se becco quella giusta, allora coloramela in verde
                lblElement.style.backgroundColor = "#00FF00";

                score += 2;
                contRight++;
            } else {
                // colora in rosso la label della sbagliata
                lblElement.style.backgroundColor = "#FF0000";

                // quella giusta era
                var num = rightAnswer.textContent

                var inputElement = buttons[num]; // quella giusta ce l'ho salvata in num
                var lblElement = inputElement.nextElementSibling
                lblElement.style.backgroundColor = "#00FF00";

                score -= 1;
                contWrong++;
            }
        }
    }

    // aggiungo i risultati a fine pagina
    pResults = document.getElementById("risultati")
    pResults.innerHTML =
        "Risposte giuste: <b>" + contRight + "</b>" + "<br>" +
        "Risposte errate: <b>" + contWrong + "</b>" + "<br>" +
        "Non risposte: <b>" + contSkip + "</b>" + "<br>" +
        "<b>Punteggio: " + score + "/" + (numberOfQuestions * 2) + "</b>" + "<br>";

    pResults.hidden = false;

    // ciò viene fatto altrimenti il timer continua
    document.getElementById("timeleft").innerHTML = ""
    clearInterval(timeUpd)

    // TODO: trovare un modo migliore per fare ciò rispeto a fare un copia-incolla
    // fa un popup contenente il testo "copia" dell'innerhtml
    testoAlert = "Risposte giuste:" + contRight + "\r\n" +
        "Risposte errate: " + contWrong + "\r\n" +
        "Non risposte: " + contSkip + "\r\n" +
        "Punteggio: " + score + "/" + (numberOfQuestions * 2) + "\r\n";

    document.getElementById("btnInvia").style.visibility = "hidden";

    window.alert(testoAlert)
}