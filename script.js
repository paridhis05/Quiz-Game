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

  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const scoreEl = document.getElementById('score');
  const restartBtn = document.getElementById('restart');
  const nextBtn = document.getElementById('next');

  function loadQuestion() {
    selectedAnswer = null; // Reset selected answer
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = '';
    nextBtn.style.display = "block";
    nextBtn.disabled = true;

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
    if (selectedAnswer !== null) return; // Prevent re-selection

    selectedAnswer = selectedIndex;
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.answer) {
      btn.classList.add("correct");
      score++;
    } else {
      btn.classList.add("wrong");
    }

    // Disable all other buttons after selection
    document.querySelectorAll('.option-btn').forEach(button => button.disabled = true);

    // Enable the next button
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