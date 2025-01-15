let currentQuestionIndex = 0;
let isBasicMode = true;
let correctAnswer;  // Track the correct answer
let score = 0;  // Initialize the score

const path = '.\\resource\\images\\';


const basicModeButton = document.getElementById('basic-mode');
const advancedModeButton = document.getElementById('advanced-mode');
const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextQuestionButton = document.getElementById('next-question');
const quizHeading = document.getElementById('quiz-heading');
const scoreElement = document.getElementById('score');

const roadSigns = [
    { title: "Stop", imagePath: path + "Stop-300x300.png" },
    { title: "Stop", imagePath: path + "Stop-1-300x300.png" },
    { title: "Stop", imagePath: path + "Stop.png" },
    { title: "Yield", imagePath: path + "Yield-1.png" },
    { title: "No Entry", imagePath: path + "No-entry-to-vehicles-300x300.png" },

    { title: "Speed Limit 30", imagePath: path + "Max-speed-limit-30kmh-300x300.png" },
    { title: "Speed Limit 50", imagePath: path + "Max-speed-limit-50kmh-300x300.png" },
    { title: "Speed Limit 60", imagePath: path + "Max-speed-limit-60kmh-300x300.png" },
    { title: "Speed Limit 80", imagePath: path + "Max-speed-limit-80kmh-300x300.png" },
    { title: "Speed Limit 100", imagePath: path + "Max-speed-limit-100kmh-300x300.png" },
    { title: "Speed Limit 120", imagePath: path + "Max-speed-limit-120kmh-300x300.png" },

    { title: "Crossroad", imagePath: path + "crossroads.png" },
    { title: "Crossroad", imagePath: path + "crossroads-1.png" },
    { title: "Crossroad with dual carriageway", imagePath: path + "Crossroads-with-dual-carriageway-300x300.png" },
    { title: "T-junction of a dual carriageway", imagePath: path + "T-junctions-of-a-dual-carriageway-300x300.png" },
    { title: "Staggered crossroads", imagePath: path + "Staggered-crossroads.png" },
    { title: "T-junction", imagePath: path + "T-junction-1.png" },
    { title: "Merging Traffic", imagePath: path + "Merging-traffic.png" },
    { title: "Two-way Traffic", imagePath: path + "Two-way-traffic.png" },
    { title: "Mini-Roundabout ahead", imagePath: path + "Mini-roundabout-ahead-300x300.png" },
    { title: "Roundabout ahead", imagePath: path + "roundabout.png" },
    { title: "Dangerous corner ahead", imagePath: path + "sharp-curve-to-the-left.png" },
    { title: "Dangerous bend ahead", imagePath: path + "Dangerous bend ahead.webp" },
    { title: "Series of dangerous bends ahead", imagePath: path + "Series-of-dangerous-bends-ahead.webp" },
    { title: "Series of dangerous corners ahead", imagePath: path + "Series-of-dangerous-corners-ahead.webp" },
    { title: "Restricted headroom", imagePath: path + "Restricted-headroom.png" },
    { title: "Side road", imagePath: path + "Side-road.png" },
    { title: "Y-junction", imagePath: path + "Y-junction-1.png" },
    { title: "Drive on left 2", imagePath: path + "Drive-on-left-2.png" },
    { title: "Safe height plate", imagePath: path + "Safe-height-plate.png" },
    { title: "Low-flying aircrafts", imagePath: path + "Low-flying aircrafts-300x300.png" },
    { title: "Road divides", imagePath: path + "Road-divides.png" },
    { title: "Merging/diverging traffic", imagePath: path + "Merging-diverging-traffic-300x300.png" },
    { title: "Dual carriage ends", imagePath: path + "Dual-carriage-ends.png" },
    { title: "Traffic crossover ahead", imagePath: path + "Traffic-crossover-ahead-300x300.png" },
    { title: "Overhead electric cables", imagePath: path + "Overhead-electric-cables-1-300x300.png" },
    { title: "Traffic signals ahead", imagePath: path + "Traffic-signals-ahead-300x300.png" },
    { title: "Pedestrian crossing ahead", imagePath: path + "Pedestrian-crossing-ahead.png" },
    { title: "Slippery road ahead", imagePath: path + "Slippery-road-ahead-300x300.png" },
    { title: "Road narrows on both sides", imagePath: path + "Road-narrows-on-both-sides-300x300.png" },
    { title: "Road narrows from left", imagePath: path + "Road-narrows-from-left-300x300.png" },
    { title: "Road narrows from right", imagePath: path + "Road-narrows-from-right-300x300.png" },
    { title: "Tunnel ahead", imagePath: path + "Tunnel-ahead-300x300.png" },
    { title: "Cyclists", imagePath: path + "Cyclists-300x300.png" },
    { title: "Start of a passing lane", imagePath: path + "Start-of-a-passing-lane-300x300.png" },
    { title: "Lane loss", imagePath: path + "Lane-loss.png" },
    { title: "Start of a climbing lane", imagePath: path + "Start-of-a-climbing-lane.png" },
    { title: "Loop road ahead", imagePath: path + "Loop-road-ahead-150x150.png" },
    { title: "Sharp dip ahead", imagePath: path + "Sharp-dip-ahead.png" },
    { title: "Series of bumps ahead", imagePath: path + "Series-of-bumps-ahead-300x300.png" },
    { title: "Sharp rise ahead", imagePath: path + "Sharp-rise-ahead.png" },
    { title: "Wild animals ahead", imagePath: path + "Wild-animals-ahead-300x300.png" },
    { title: "Sheep", imagePath: path + "Sheep-300x300.png" },
    { title: "Cattle and farm animals", imagePath: path + "Cattle-and-farm-animals-300x300.png" },
    { title: "Accompanied horses and ponies", imagePath: path + "Accompanied-horses-and-ponies-300x300.png" },
    { title: "Crosswinds", imagePath: path + "Crosswinds.png" },
    // will continue later

    { title: "No U-Turn", imagePath: path + "No-U-Turn-300x300.png" },
    { title: "100m to next exit", imagePath: path + "100m-to-next-exit-1.png" },
    { title: "200m to next exit", imagePath: path + "200m-to-next-exit-1.png" },
    { title: "300m to next exit", imagePath: path + "300m-to-next-exit-1.png" },

    // Add more road signs as needed
];

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

    if (isBasicMode) {
        questionText.innerHTML = `<img src="${currentSign.imagePath}" alt="Road Sign" style="max-width: 300px; max-height: 300px; height: auto; width: auto;">`;
    } else {
        questionText.textContent = `What does the sign titled '${currentSign.title}' look like?`;
    }

    const shuffledSigns = shuffleArray(roadSigns); // Shuffle the entire array of road signs to ensure random selection of options

    // Select the correct sign and get 3 random signs from the shuffled array
    const options = [currentSign, ...shuffledSigns.filter(sign => sign !== currentSign).slice(0, 3)];

    // Shuffle the options again so the correct answer appears in a random position
    const finalOptions = shuffleArray(options);

    // Clear previous options
    optionsContainer.innerHTML = '';

    // Display the options // lambda function
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
    // Compare the selected option with the correct answer
    if (isBasicMode) {
        if (selectedOption.title === correctAnswer.title) {
            score++;
            alert('Correct!');
        } else {
            alert('Wrong answer, try again. You chose: ' + selectedOption.title);
        }
    } else {
        if (selectedOption.imagePath === correctAnswer.imagePath) {
            score++;
            alert('Correct!');
        } else {
            alert('Wrong answer, try again. You chose an image of: ' + selectedOption.title);
        }
    }

    // Disable all buttons after selection (correct or wrong)
    const allButtons = optionsContainer.querySelectorAll('button');
    allButtons.forEach(button => {
        button.disabled = true;  // Disable the button
    });

    // Update score on the screen
    scoreElement.textContent = score;
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