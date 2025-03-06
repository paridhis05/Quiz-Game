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

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let timerInterval;
let timeLeft = 10;

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
    timeLeft--;
    timerEl.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

function handleTimeout() {
  document.querySelectorAll('.option-btn').forEach(button => button.disabled = true);
  nextBtn.disabled = false;
  timerEl.textContent = "Time's up!";
}

function loadQuestion() {
  clearInterval(timerInterval);
  startTimer();

  selectedAnswer = null;
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = '';
  nextBtn.style.display = "block";
  nextBtn.disabled = true;
  progressEl.textContent = `${currentQuestionIndex + 1} / ${questions.length}`;

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
  if (selectedAnswer !== null) return;
  clearInterval(timerInterval);

  selectedAnswer = selectedIndex;
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedIndex === currentQuestion.answer) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
  }

  document.querySelectorAll('.option-btn').forEach(button => button.disabled = true);
  nextBtn.disabled = false;
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  document.getElementById('quiz').style.display = 'none';
  scoreEl.textContent = `You scored ${score} out of ${questions.length}!`;
  restartBtn.style.display = 'block';
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreEl.textContent = '';
  restartBtn.style.display = 'none';
  document.getElementById('quiz').style.display = 'block';
  loadQuestion();
}

function startQuiz() {
  document.getElementById('start').style.display = 'none';
  document.getElementById('quiz').style.display = 'block';
  loadQuestion();
}