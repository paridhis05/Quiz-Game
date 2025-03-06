// An array of question objects is created
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: 0
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 1
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "Jane Austen", "J.K. Rowling"],
    answer: 0
  }
];

let currentQuestionIndex = 0; // Keeps track of the current question
let score = 0; // Counts how many correct answers the user gives
let selectedAnswer = null; // Stores the user’s selected option
let timerInterval; // Stores the timer reference
let timeLeft = 10; // The countdown timer value (starts at 10 seconds per question)

const questionEl = document.getElementById('question');
const timerEl = document.getElementById('timer');
const optionsEl = document.getElementById('options');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart');
const nextBtn = document.getElementById('next');
const progressEl = document.getElementById('progress');

function startTimer() {
  timeLeft = 10;
  timerEl.textContent = `Time Left: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--; // Every 1 second, it decreases
    timerEl.textContent = `Time Left: ${timeLeft}s`; // Updates the timer display

    // If the timer reaches 0, the interval stops and handleTimeout() is called
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

// When Time Runs Out
function handleTimeout() {
  document.querySelectorAll('.option-btn').forEach(button => button.disabled = true); // All option buttons are disabled
  nextBtn.disabled = false; // Next button is enabled
  timerEl.textContent = "Time's up!"; // Message changes to "Time's up!"
}

function loadQuestion() {
  // Timer restarts when a new question loads
  clearInterval(timerInterval);
  startTimer();

  // question and options are dynamically updated
  selectedAnswer = null;
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = '';
  nextBtn.style.display = "block";
  nextBtn.disabled = true; // Next button is hidden until an answer is chosen
  progressEl.textContent = `${currentQuestionIndex + 1} / ${questions.length}`; // progress counter (e.g., "Q1 / 3") is updated.

  // options are created dynamically as buttons
  currentQuestion.options.forEach((option, index) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.classList.add('option-btn');
    btn.onclick = () => selectOption(btn, index);
    li.appendChild(btn);
    optionsEl.appendChild(li);
  });
}

function selectOption(btn, selectedIndex) {
  if (selectedAnswer !== null) return; // Prevents multiple selections
  clearInterval(timerInterval); // Stops the timer since the user answered before time ran out

  selectedAnswer = selectedIndex;
  const currentQuestion = questions[currentQuestionIndex];

  // Checks if the answer is correct
  if (selectedIndex === currentQuestion.answer) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
  }

  document.querySelectorAll('.option-btn').forEach(button => button.disabled = true); // Disables all buttons to prevent further changes
  nextBtn.disabled = false; // Enables the "Next" button
}

function nextQuestion() {
  currentQuestionIndex++; // Moves to the next question

  // If all questions are answered, it calls showScore()
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  document.getElementById('quiz').style.display = 'none'; // Quiz disappears
  scoreEl.textContent = `You scored ${score} out of ${questions.length}!`; // Final score is displayed
  restartBtn.style.display = 'block'; // Restart button appears
}

function restartQuiz() {
  currentQuestionIndex = 0; // Question index and score reset
  score = 0;
  scoreEl.textContent = ''; // Score display is cleared
  restartBtn.style.display = 'none'; // Restart button disappears
  document.getElementById('quiz').style.display = 'block'; //Quiz starts again
  loadQuestion();
}

function startQuiz() {
  document.getElementById('start').style.display = 'none'; // Start button disappears
  document.getElementById('quiz').style.display = 'block'; // Quiz section becomes visible
  loadQuestion(); // First question loads
}