# JSQuizee
JSQuizee (JS Simple Quiz Engine) is a simple JS engine for your quizzes.

## Disclaimer
> The author and contributors assume no liability and no warranty for misuse of this tool.

We do not have the ability to supervise quizzes made by users or from another fork.

Use it on your own at your own risk.

Feel free to give me a hand by **opening PR**. 


## About this tool
This tool allows you to practice on your own with your JSON files on whatever you want.

You could also share your questions and answers with other students by uploading each file and folder to an online web space, since everything is offline and made to work client-side.

Also, a teacher could use this tool to assess individual students' knowledge.

**For further instructions look at [setup section](#setup)**.

## Setup
The code was written entirely in JavaScript vanilla, so it is cross-platform and all major browsers should work. 

**Live demo (cross-platform optimized for mobile too)**: [https://dag7dev.github.io/JSQuizee/](https://dag7dev.github.io/JSQuizee/)

Steps:
1. You will need git and python3.
2. Clone this repository and go to JSQuizee directory:
```
git clone https://github.com/dag7dev/JSQuizee.git && cd JSQuizee
```
3. if you plan to use it **locally, on your pc**, you'll need to find a way to enable the CORS request on your browser, since loading local files is disabled on all major browsers.
- give `python -m http.server 8000` to run a local server
- direct your browser to `localhost:8000`: you should find the JSQuizee folder, open the index.html file

4. if you plan to use it **online**, no further steps than clone the entire folder on your online space and add/remove your quizzes are required 

# How to set up JSQuizee
You will have four items in the JSQuizee folder:
- `README.MD`: the file you are reading
- `js`:
    - `main.json`: file loaded from index.html, __DO NOT edit it if you don't know what you're doing__
    - `config.json`: this is the configuration file for the quiz. You don't have to delete anything, just set the things you need/do not need.

`config.json` will look like this:
```
nMinutes: how long the quiz should last in minutes.
rightAnswerPoints: points given by giving the correct answer, 2 by default
wrongAnswerPoints: points that will be subtracted by giving a wrong answer, 1 by default
noAnswerPoints: points given by not giving an answer, 0 by default
numberOfQuestions: default number of questions to show
title: will be shown in the index page

showSlider: show / hide cursor part (true / false value)
showTimer: show/hide timer part (true/false value)
showShuffleQuestions: show/hide the box for the shuffle questions part (true/false value)
showShuffleAnswers: show/hide the box for the mixed answers part (true/false value)

jsonFolder: name of the folder where you put your json files; works with RELATIVE PATH
jsonFiles: quizzes folder. The first file in this list will be loaded as the default quiz. WORKS WITH RELATIVE PATH

Syntax:
var jsonFiles = { // load more quizzes
    "example.json": "Example questions",
    "your_file.json": "Quiz name".
};

Note: your `your_file.json` must be in your json folder
```
- `json`: this will contain your quizzes. Each file will have a list of questions and answers, which should be defined as follows (you can look at `example_questions.json` for an easier reference):
    ```
    [
    {
        "question": "Your question",
        "answers": [
            "First answer",
            "Second answer",
            "Third answer",
            "Fourth answer".
        ],
        "correct": "the letter of the correct answer (e.g. d)",
        "answers_have_code": 0,
        "code": ""
    },
    ]
    ```
    
    **OPTIONAL:** Since this quiz is designed to test developers' knowledge, you can render the source code by putting:
    ```
    "answers_have_code": 1 // render the answers as source code
    "code": "source code properly escaped by JSON"
    ```

- `index.html`: run this if you want to start the quiz

**NOTE**: "code" and any answers which contains code in "answers", __must be properly JSON escaped__.

## Deploy it to a website
Since everything is entended to be run locally, client-side, you can upload each modified file and folder in the JSQuizee directory to a web space.

Your website will load index.html by default.

You could also use Github Pages, forking this repo, editing/adding your files and uploading them back to your repo.

If you don't know how to enable Github Pages for your webpage, [click here](https://guides.github.com/features/pages/).

## How to contribute (todo wish-list)

- [ ] **JSON editor**: it will allow you to easily create a JSON file with all your questions
- [ ] implement a **server-side mode**: in this way, people can use it in a real scenario (with students for example)
- [ ] **style** this website with an awesome CSS: it was poorly designed (on purpose), some stylish css would be nice!
- [X] **Clean source code**: since the source code was developed in a few hours, it would be nice to clean it up a bit or optimize things
- [X] Guidelines and **documents**

For anything, open a PR or issue.

If you like this project, remember to leave a star or consider the idea to [make a donation](https://www.paypal.com/paypalme/therealdag7).
