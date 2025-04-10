let currentQuestion = 0;
let score = 0;
let selectedTopic = "";
let userData = {};
let answers = [];
let users = JSON.parse(localStorage.getItem("quizUsers")) || [];

const quizData = {
  os: [
    { question: "What does OS stand for?", options: ["Operating System", "Open Software", "Output System", "Online Software"], answer: "Operating System" },
    { question: "The two types of semaphores are", options: ["Windows", "Linux", "Oracle", "MacOS"], answer: "Oracle" }
  ],
  dbms: [
    { question: "What is DBMS?", options: ["Data Base Management System", "Digital Base Map Structure", "Data Block Mapping Service", "None"], answer: "Data Base Management System" },
    { question: "Which of these is a SQL command?", options: ["GET", "SELECT", "FETCH", "PULL"], answer: "SELECT" }
  ],
  cn: [
    { question: "Which layer in OSI model handles routing?", options: ["Transport", "Network", "Data Link", "Application"], answer: "Network" },
    { question: "Which device connects networks?", options: ["Switch", "Router", "Modem", "Repeater"], answer: "Router" }
  ],
  prog: [
    { question: "Which language is used for web development?", options: ["Python", "HTML", "C++", "Java"], answer: "HTML" },
    { question: "What is 5 + 3?", options: ["6", "8", "9", "10"], answer: "8" }
  ],
  oops: [
    { question: "OOP stands for?", options: ["Object-Oriented Programming", "Optical Output Programming", "Object Operated Program", "None"], answer: "Object-Oriented Programming" },
    { question: "Which is not a pillar of OOP?", options: ["Encapsulation", "Inheritance", "Compilation", "Polymorphism"], answer: "Compilation" }
  ]
};

function goToTopicSelection() {
  userData = {
    name: document.getElementById("name").value,
    regno: document.getElementById("regno").value,
    email: document.getElementById("email").value,
    contact: document.getElementById("contact").value
  };

  if (!userData.name || !userData.regno || !userData.email || !userData.contact) {
    alert("Please fill out all fields.");
    return;
  }

  document.getElementById("user-info").classList.add("hidden");
  document.getElementById("topic-selection").classList.remove("hidden");
}

function startQuiz() {
  selectedTopic = document.getElementById("topic").value;
  if (!selectedTopic) {
    alert("Please select a topic.");
    return;
  }

  document.getElementById("topic-selection").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const questions = quizData[selectedTopic];
  const q = questions[currentQuestion];
  document.getElementById("question-container").innerHTML = `<h2>${q.question}</h2>`;
  document.getElementById("options-container").innerHTML = q.options.map(opt => `
    <button class="option-btn" onclick="selectAnswer(this)">${opt}</button>
  `).join("");
}

function selectAnswer(btn) {
  const selected = btn.textContent;
  answers.push(selected);
  if (selected === quizData[selectedTopic][currentQuestion].answer) {
    score++;
  }

  document.querySelectorAll(".option-btn").forEach(b => {
    b.disabled = true;
    if (b.textContent === quizData[selectedTopic][currentQuestion].answer) {
      b.style.backgroundColor = "#28a745";
      b.style.color = "#fff";
    } else if (b.textContent === selected) {
      b.style.backgroundColor = "#dc3545";
      b.style.color = "#fff";
    }
  });
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData[selectedTopic].length) {
    showQuestion();
  } else {
    endQuiz();
  }
}