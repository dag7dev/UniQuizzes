# JSQuizee
JSQuizee (JS Simple Quiz Engine) is a simple JS engine for your quizzes.

## Disclaimer
---
The author and contributors assume no liability and no warranty for misuse of this tool.

We do not have the ability to supervise quizzes made by users or from another fork.

Use it on your own, but more importantly, **give me a hand** by **submitting** new quizzes or **opening PR**. 

---
## What is this tool
This tool allows you to practice on your own with your JSON files on whatever you want.

You could also share your questions and answers with other students by uploading each file and folder to an online web space, since everything is offline and made to work client-side.

Also, a teacher could use this tool to assess individual students' knowledge.

**For further instructions look at [setup section](#setup)**.

---

## Setup
The code was written entirely in JavaScript, so it is cross-platform and all major browsers should work. 

**Live demo (cross-platform optimized for mobile too)**: [https://dag7dev.github.io/JSQuizee/](https://dag7dev.github.io/JSQuizee/)

Clone this repository to your space by downloading the zip package of this repo and going to the JSQuizee directory, or by giving this command from terminal:
```
git clone https://github.com/dag7dev/JSQuizee.git && cd JSQuizee
```

---

⚠️**Caution - read carefully**⚠️

Thanks to a user who discovered this, if you plan to use it **locally, on your pc**, you'll need to find a way to enable the CORS request on your browser, since loading local files is disabled on all major browsers.

Here is a simple way:
- install Python3
- from terminal `python -m http.server 8000`.
- direct your browser to `localhost:8000`: you should find the JSQuizee folder, open the index.html file

---

# How to set up JSQuizee
You will have four entries in the JSQuizee folder:
- `README.MD`: the file you are reading
- `js`:
    - `config.json`: this is the configuration file for the quiz. You don't have to delete anything, just set the things you need/do not need.
        - nMinutes: how long the quiz should last in minutes.
        - rightAnswerPoints: points given by giving the correct answer, 2 by default
        - wrongAnswerPoints: points that will be subtracted by giving a wrong answer, 1 by default
        - noAnswerPoints: points given by not giving an answer, 0 by default
        - numberOfQuestions: default number of questions to show

        - showSlider: show / hide cursor part (true / false value)
        - showTimer: show/hide timer part (true/false value)
        - showShuffleQuestions: show/hide the box for the shuffle questions part (true/false value)
        - showShuffleAnswers: show/hide the box for the mixed answers part (true/false value)

        - jsonFolder`: name of the folder where you put your json files; do not put ABSOLUTE PATH, it works with RELATIVE PATH
        - `jsonFiles`: additional (or default) quizzes made by you. The first file in this list will be loaded as the default quiz. DO NOT INSERT ABSOLUTE PATH, WORKS WITH RELATED PATH Syntax:
        ```
            var jsonFiles = { // load more quizzes
                "example.json": "Example questions",
                "your_file.json": "Quiz name".
            };
        ```
       
        Note: your `your_file.json` must be put in your json folder

    - `main.json`: file loaded from index.html, __don't edit it if you don't know what you're doing__
- `json`: this will contain your quizzes. Each file will have a list of questions and answers, which should be defined as follows (you can look at `example_questions.json` for an easier reference):
    ```
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
        "has_code": 0,
        "code": ""
    }
    ```
    
    **OPTIONAL:** Since this quiz is designed to test developers' knowledge, you can render the source code by putting:
    ```
    "answers_have_code": 1 // this will render the answers as source code if they contain source code
    "has_code": 1 // this will make the questions as source code, if the field "code" has been defined
    "code": "source code properly escaped by JSON"
    ```

- `index.html`: run this if you want to start the quiz

**NOTE**: "code" and any answers which contains code in "answers", __must be properly JSON escaped__.

## Deploy it to a website
Since everything is entended to be run locally, client-side, you can upload each modified file and folder in the JSQuizee directory to a web space.

Your website will load index.html by default.

You could also use Github Pages, forking this repo, editing/adding your files and uploading them back to your repo.

If you don't know how to enable Github Pages for your webpage, [click here](https://guides.github.com/features/pages/).

## How to contribute

Create a general purpose JSON file (flower or animal quiz or whatever you like) and share it with me, or if you're not sure, check out the todo-wish-list.

## Todo wish-list

- [ ] JSON editor: it will allow you to easily create a JSON file with all your questions
- [ ] run this project from a server-side mode: this way, people can use it in a real scenario (with students for example)
- [X] Clean source code: since the source code was developed in a few hours, it would be nice to clean it up a bit or optimize things
- [ ] Guidelines and documents

For anything, open a PR or issue.

If you like any of this or it was helpful, please remember to leave a star :D
