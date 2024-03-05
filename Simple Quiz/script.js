let score = 0;
let currentQuestionIndex = 0;
let questionSet = false;

const question = document.getElementById("question");
const options = document.getElementById("opts");
const nextButton = document.querySelector("#next-btn button");


async function fetchQuizQuestions() {
    try {
        //Fetch the JSON file
        const response = await fetch("/quiz_questions.json");

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        //Parse JSON data
        const data = await response.json();

        return data;

    } catch (error) {
        console.error("There was a problem fetching data:", error);
    }
}

async function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    if (!questionSet) {
        questionSet = await fetchQuizQuestions();
    }
    showQuestion(questionSet);
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    if (selectedBtn.dataset.answer === "true") {
        selectedBtn.classList.add("correct");
        score++;
    }
    else
        selectedBtn.classList.add("incorrect");

    //once after chossing the option below loop checks if that selected option is correct or not by adding correct class to the correct option so it will display in green color.
    Array.from(options.children).forEach(button => {
        if (button.dataset.answer === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showQuestion(data) {
    let currentQuestion = data[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;

    question.innerHTML = questionNumber + ". " + currentQuestion.question;

    options.innerHTML = "";

    currentQuestion.options.forEach(element => {
        const but = document.createElement("Button");
        but.innerHTML = element;
        but.classList.add("opt-btn");
        options.appendChild(but);
        but.dataset.answer = (element === currentQuestion.answer);
        but.addEventListener("click", selectAnswer);
    });
}

function showScore() {
    options.innerHTML = "";
    question.innerHTML = `You Scored ${score} out of ${questionSet.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function hadleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionSet.length) {
        showQuestion(questionSet);
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questionSet.length) {
        hadleNextButton();
    } else {
        startQuiz();
    }
})


startQuiz();