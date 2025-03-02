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

  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const scoreEl = document.getElementById('score');
  const restartBtn = document.getElementById('restart');

  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
      const li = document.createElement('li');
      li.innerHTML = `<button class="option-btn" onclick="selectOption(${index})">${option}</button>`;
      optionsEl.appendChild(li);
    });
  }

  function selectOption(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.answer) {
      score++;
      alert('Correct!');
    } else {
      alert('Wrong!');
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showScore();
    }
  }

  function showScore() {
    questionEl.style.display = 'none';
    optionsEl.style.display = 'none';
    scoreEl.textContent = `You scored ${score} out of ${questions.length}!`;
    restartBtn.style.display = 'block';
  }

  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questionEl.style.display = 'block';
    optionsEl.style.display = 'block';
    scoreEl.textContent = '';
    restartBtn.style.display = 'none';
    loadQuestion();
  }

  loadQuestion();