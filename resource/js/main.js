let currentQuestionIndex = 0;
let isBasicMode = true;
let correctAnswer;  // Track the correct answer
let score = 0;

const path = '.\\resource\\images\\';

const basicModeButton = document.getElementById('basic-mode');
const advancedModeButton = document.getElementById('advanced-mode');
const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextQuestionButton = document.getElementById('next-question');
const quizHeading = document.getElementById('quiz-heading');
const scoreElement = document.getElementById('score');
const quizlengthElement = document.getElementById('quiz-length-container');
const checkAnswerElement = document.getElementById('check-answer');

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
    { title: "Side road", imagePath: path + "Sideroad.png" },
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
    { title: "Steep descent ahead", imagePath: path + "Steep-descent-ahead-300x300.png" },
    { title: "Steep ascent ahead", imagePath: path + "Steep-ascent-ahead-300x300.png" },
    { title: "Danger of falling rocks", imagePath: path + "Danger-of-falling-rocks-300x300.png" },
    { title: "Unprotected quay, canal or river", imagePath: path + "Unprotected-quay-canal-or-river.png" },
    { title: "Level crossing ahead, guarded by gates or lifting barrier", imagePath: path + "Level-crossing-ahead-guarded-by-gates-or-lifting-barrier-300x300.png" },
    { title: "Level crossing ahead, unguarded by gates or lifting barrier", imagePath: path + "Level-crossing-ahead-unguarded-by-gates-or-lifting-barrier-300x300.png" },
    { title: "Level crossing ahead, guarded by gates or lifting barriers", imagePath: path + "Level-crossing-ahead-guarded-by-gates-or-lifting-barriers-300x300.png" },
    { title: "Stop when lights are red", imagePath: path + "Stop-when-lights-are-red-1.png" },
    { title: "Automatic level crossing ahead", imagePath: path + "Automatic-level-crossing-ahead-1.png" },
    { title: "Chevron board (left)", imagePath: path + "Chevron-board-left.png" },
    { title: "Chevron board (right)", imagePath: path + "Chevron-board-right-1.png" },
    { title: "Tram lane crossing ahead", imagePath: path + "Tram-lane-crossing-ahead-300x300.png" },
    { title: "Tram lane warning signs for pedestrians (look left)", imagePath: path + "Tram-lane-warning-signs-for-pedestrians-look-left-1.png" },
    { title: "Tram lane warning signs for pedestrians (look both sides)", imagePath: path + "Tram-lane-warning-signs-for-pedestrians-look-both-sides-1.png" },
    { title: "Tram lane warning signs for pedestrians (look right)", imagePath: path + "Tram-lane-warning-signs-for-pedestrians-look-right.png" },
    { title: "Slippery for cyclists", imagePath: path + "Slippery-for-cyclists.png" },
    { title: "School ahead", imagePath: path + "School-ahead-300x300.png" },
    { title: "School children crossing ahead", imagePath: path + "School-children-crossing-ahead.png" },
    { title: "Children crossing ahead (in residential areas)", imagePath: path + "Children-crossing-ahead.png" },
    //======================================= Warning signs for road work =======================================
    { title: "Road works ahead", imagePath: path + "Road-works-ahead-1-300x300.png" },
    { title: "One-lane crossover (out)", imagePath: path + "One-lane-crossover-out.png" },
    { title: "One-lane crossover (back)", imagePath: path + "Diamond_road_sign_one-lane_crossover_back.svg-300x300.png" },
    { title: "Move to right (one lane)", imagePath: path + "Move-to-right-one-lane-1.png" },
    { title: "Move to left (one lane)", imagePath: path + "Move-to-left-one-lane-1.png" },
    { title: "Move to right (two lanes)", imagePath: path + "Move-to-left-two-lanes-3.png" },
    { title: "Move to left (two lanes)", imagePath: path + "Move-to-right-two-lanes.png" },
    { title: "Obstruction between lanes", imagePath: path + "Obstruction-between-lanes-1.png" },
    { title: "End of obstruction between lanes", imagePath: path + "End-of-obstruction-between-lanes-2.png" },
    { title: "Start of central reserve or obstruction", imagePath: path + "Startofcentralreserve.png" },
    { title: "End of central reserve or obstruction", imagePath: path + "Endofobstructionbetweenlanes.png" },
    { title: "Lanes diverge at crossover", imagePath: path + "Lanes-diverge-at-crossover.png" },
    { title: "Lanes rejoin at crossover", imagePath: path + "Lanes-rejoin-at-crossover.png" },
    { title: "Two-lanes crossover (back)", imagePath: path + "Two-lanes-crossover-back-150x150.png" },
    { title: "Two-lanes crossover (out)", imagePath: path + "Two-lanes-crossover-out-1.png" },
    { title: "Single-lane (for shuttle working)", imagePath: path + "Single-lane-for-shuttle-working.png" },
    { title: "Two-way traffic", imagePath: path + "Two-way-traffic-1.png" },
    { title: "Road narrows from left", imagePath: path + "Road-narrows-from-left.png" },
    { title: "Road narrows from right", imagePath: path + "Road-narrows-from-right.png" },
    { title: "Road narrows on both sides", imagePath: path + "Road-narrows-on-both-sides.png" },
    { title: "Offside lane (of two) closed", imagePath: path + "Offside-lane-of-two-closed.png" },
    { title: "Nearside lane (of two) closed", imagePath: path + "a_3yPcS-300x300.png" },
    { title: "Offside lane (of three) closed", imagePath: path + "Offside-lane-of-three-closed.png" },
    { title: "Nearside lane (of three) closed", imagePath: path + "as-300x300.png" },
    { title: "Two offside lanes (of three) closed", imagePath: path + "Two-offside-lanes-of-three-closed.png" },
    { title: "Two nearside lanes (of three) closed", imagePath: path + "Two-nearside-lanes-of-three-closed.-Two-alternative-styles.png" },
    { title: "Offside lane (of four) closed", imagePath: path + "Offside-lane-of-four-closed-1.png" },
    { title: "Nearside lane (of four) closed", imagePath: path + "WK046-300x300.png" },
    { title: "Two offside lanes (of four) closed", imagePath: path + "Two-offside-lanes-of-four-closed-1.png" },
    { title: "Two nearside lanes (of four) closed", imagePath: path + "Two-nearside-lanes-of-four-closed-1.png" },
    { title: "Side road on left", imagePath: path + "Side-road-on-left-1.png" },
    { title: "Side road on right", imagePath: path + "Side-road-on-right-2.png" },
    { title: "Site access on left", imagePath: path + "Site-access-on-left-300x300.png" },
    { title: "Site access on right", imagePath: path + "ssfdf-300x300.png" },
    { title: "Temporary traffic signal ahead", imagePath: path + "Temporary-traffic-signal-ahead.png" },
    { title: "Flagman ahead", imagePath: path + "Flagman-ahead-300x300.png" },
    { title: "Slippery road", imagePath: path + "Slippery-road-300x300.png" },
    { title: "Loose chippings", imagePath: path + "Loose-chippings.png" },
    { title: "Queues likely", imagePath: path + "Queues-likely.png" },
    { title: "Hump or ramp", imagePath: path + "Hump-or-ramp.png" },
    { title: "", imagePath: path + ".png" },
    { title: "", imagePath: path + ".png" },
    { title: "", imagePath: path + ".png" },
    { title: "", imagePath: path + ".png" },
    { title: "", imagePath: path + ".png" },
    { title: "", imagePath: path + ".png" },
    { title: "", imagePath: path + ".png" },
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
    quizlengthElement.textContent = `Number of signs ${roadSigns.length}`;

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
    // checkAnswerElement.textContent = 'Waiting';
    // Compare the selected option with the correct answer
    if (isBasicMode) {
        if (selectedOption.title === correctAnswer.title) {
            score++;
            // alert('Correct!');
            checkAnswerElement.textContent = 'Correct';
        } else {
            // alert('Wrong answer, try again. You chose: ' + selectedOption.title);
            checkAnswerElement.textContent = 'Incorrect';
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