import roadSigns from './roadSigns.js';

let currentQuestionIndex = 0;
let isBasicMode = true;
let correctAnswer;  // Track the correct answer
let score = 0;

let categoryTracker = {}; // this will track the category a user answer meaning this is to track this section

const basicModeButton = document.getElementById('default-mode');
const advancedModeButton = document.getElementById('picture-mode');
const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextQuestionButton = document.getElementById('next-question');
const quizHeading = document.getElementById('quiz-heading');
const scoreElement = document.getElementById('score');
const quizlengthElement = document.getElementById('quiz-length-container');
const checkAnswerElement = document.getElementById('check-answer');
const correctAnswerElement = document.getElementById('correct-answer');
const performanceTrackerElement = document.getElementById('performance-tracker');

function startQuiz(basicMode) {
    isBasicMode = basicMode;
    currentQuestionIndex = 0;
    quizContainer.style.display = 'block';
    displayQuestion();
}

function displayQuestion() {
    const currentSign = roadSigns[currentQuestionIndex];

    correctAnswer = currentSign; // Track the correct answer
    quizHeading.textContent = `Question ${currentQuestionIndex + 1}`;
    quizlengthElement.textContent = `Number of signs ${roadSigns.length}`;

    if (isBasicMode) {
        questionText.innerHTML = `<img src="${currentSign.imagePath}" alt="Road Sign" style="max-width: 200px; max-height: 200px; height: auto; width: auto;">`;
    } else {
        questionText.textContent = `What does the sign titled '${currentSign.title}' look like?`;
    }

    const shuffledSigns = shuffleArray(roadSigns);

    const options = [currentSign, ...shuffledSigns.filter(sign => sign !== currentSign).slice(0, 3)];

    const finalOptions = shuffleArray(options);

    optionsContainer.innerHTML = '';
    checkAnswerElement.textContent = '';
    correctAnswerElement.textContent = '';



    // lambda function totally different to Java
    finalOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = isBasicMode ? option.title : 'See Image';

        if (!isBasicMode) {
            button.innerHTML = `<img src="${option.imagePath}" alt="Road Sign" style="max-width: 100px; max-height: 100px; height: auto; width: auto;">`;
        }
        button.onclick = () => handleAnswer(option, button);
        optionsContainer.appendChild(button);
    });
}

function handleAnswer(selectedOption, buttonClicked) {
    const allButtons = optionsContainer.querySelectorAll('button');
    // checkAnswerElement.textContent = 'Waiting';
    if (isBasicMode) {
        if (selectedOption.title === correctAnswer.title) {
            score++;
            // alert('Correct!');
            showMessage('Correct', 'green');
            updateCategoryTracker(correctAnswer.category, true);
        } else {
            showMessage('Incorrect', 'red');
            correctAnswerElement.textContent = 'Correct answer is: ' + correctAnswer.title;
            updateCategoryTracker(correctAnswer.category, false);

        }
    } else {
        if (selectedOption.imagePath === correctAnswer.imagePath) {
            score++;
            showMessage('Correct', 'green');
            updateCategoryTracker(correctAnswer.category, true);
        } else {
            showMessage('Wrong answer, try again. You chose an image of:', 'red');
            updateCategoryTracker(correctAnswer.category, false);
        }
    }

    allButtons.forEach(button => {
        button.disabled = true;
    });
    showCategoryPerformance();
    scoreElement.textContent = score;
    }
    function showMessage(message, fontColor){
        checkAnswerElement.textContent = message;
        checkAnswerElement.style.color = fontColor;
    }
    function updateCategoryTracker(category, correct) {
        if (!categoryTracker[category]) {
            categoryTracker[category] = { correct: 0, total: 0 };
        }

        categoryTracker[category].total++;
        if (correct) {
            categoryTracker[category].correct++;
        }
    }
    function showCategoryPerformance() {
    performanceTrackerElement.innerHTML = '';
    for (const [category, { correct, total }] of Object.entries(categoryTracker)) {
        const percentage = total > 0 ? ((correct / total) * 100).toFixed(2) : 0;
        performanceTrackerElement.innerHTML += `<p><strong>${category}</strong>: ${correct}/${total} correct (${percentage}%)</p>`;
    }
    }


function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= roadSigns.length) {
        alert('Quiz Completed!');
        quizContainer.style.display = 'none';
    } else {
        displayQuestion();
    }
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

basicModeButton.onclick = () => startQuiz(true);
advancedModeButton.onclick = () => startQuiz(false);
nextQuestionButton.onclick = nextQuestion;