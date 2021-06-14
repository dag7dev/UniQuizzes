# JSQuizee
JSQuizee (JS Simple Quiz Engine) is a simple JS engine for your quizzes.

## Disclaimer
---
The author and the contributors assume no liability and no warranty for improper usages of this tool.

We don't have the ability to supervise on quizzes made by users or a modified source.

Use it on your own, but, most importantly, **gimme a hand** by **submitting issues** or **opening PRs**. 

---
## What this tool is
This tool allows you to practise on your own with your JSON files on whatever you want.

You could even share your questions and answer with other students by uploading every file and folder in an online webspace, since everything is offline and made up for running by client-side.

Additionally, a teacher could use this tool to evaluate individual students knowledge.

**For further instructions looks [setup instructions](#setup)**

---

## Setup
The code has been written entirely in JavaScript, so it's cross-platform and every major browser should work. 

**Live demo (cross-platform optimized for mobile too)**: [https://dag7dev.github.io/JSQuizee/](https://dag7dev.github.io/JSQuizee/)

Clone this repository on your space by downloading the zip of this repo and going into JSQuizee directory or giving this command from terminal:
```
git clone https://github.com/dag7dev/JSQuizee.git && cd JSQuizee
```

You will have four entries :
- `README.MD`: the file which are you currently reading
- `js`
    - `config.json`: this is the config file for the quiz. You must not delete anything, just set things you need / no need.
        - `nMinutes`: how long should the quiz take in minutes
        - `rightAnswerPoints`: points given by giving the correct answer, 2 by default
        - `wrongAnswerPoints`: points that will be subtracted from giving a wrong answer, 1 by default
        - `noAnswerPoints`: points given by not giving answers, 0 by default
        - `numberOfQuestions`: default number of questions that you want to show

        - `showSlider`: shows / hides slider part (true / false value)
        - `showTimer`: shows / hides timer part (true / false value)
        - `showShuffleQuestions`: shows / hides box for shuffling questions part (true / false value)
        - `showShuffleAnswers`: shows / hides box for shuffling answers part (true / false value)

        - `jsonFolder`: name of the folder where you have placed your json files
        - `jsonFiles`: additional (or default quiz) made by you. The first file in this list will be loaded as the default quiz. Syntax:
        ```
            var jsonFiles = { // load other quizzes
                "example.json": "Example questions",
                "your_file.json": "Name of the quiz"
            };
        ```
       
        Note: your `your_file.json` must be placed in your json folder

    - `main.json`: file loaded by index.html, __don't modify it unless you know what you are doing__
- `json`: this will contains your quizzes. Each file will have a list of questions and answers, that must be defined as follows (you could look `example_questions.json` for an easier reference):
    ```
    {
        "question": "Your question",
        "answers": [
            "First answer",
            "Second answer",
            "Third answer",
            "Fourth answer"
        ],
        "correct": "the letter of the correct answer (ex. d)",
        "answers_have_code": 0,
        "has_code": 0,
        "code": ""
    }
    ```
    
    **OPTIONAL:** Since this quiz have been thought to test developers knowledge, you can render source code by placing:
    ```
    "answers_have_code": 1        // this will render answers as source code, if they contain source code
    "has_code": 1                 // this will render questions as source code, if "code" field has been defined
    "code":                       "source code properly JSON escaped"
    ```

- `index.html`: run this if you want to start the quiz

**NOTE**: "code" and each answer in "answers", __must be properly JSON escaped__.

## Deploy it on a website
Since everything is made up by client, you can upload every modified file and folder in the JSQuizee directory into a web space.

Your website will load `index.html` by default. 

You could even use Github Pages, by forking this repo, modifying / adding your files and upload them back in your repo.

If you don't know how to activate Github Pages for your webpage, [just click here](https://guides.github.com/features/pages/).

## How to contribute
Create a general purpose JSON file (quiz on flowers or animals or whatever you prefer) and share it with me, or if you're unsure, give a look at the [todo-wish-list](#todo-wish-list).

## Todo wish list
- [ ] JSON editor: will let you create in an easy way a JSON file with all your questions
- [ ] Clean source code: since source code has been developed in very few hours, it would be nice to clean it a little bit or to optimize things
- [X] Guidelines and docs

For anything, **open a PR** or an **issue**.

If you like all this or it has been useful for you, please, remember to leave a star :D
