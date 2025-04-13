let currentQuestion = 0;
let score = 0;
let selectedTopic = "";
let userData = {};
let answers = [];
let users = JSON.parse(localStorage.getItem("quizUsers")) || [];

const quizData = {
  os: [
    { question: "What does OS stand for?", options: ["Operating System", "Open Software", "Output System", "Online Software"], answer: "Operating System" },
    { question: "Which of the following page replacement algorithms suffers from Belady's anomaly?", options: ["LRU", "Optimal", "FIFO", "LFU"], answer: "FIFO" },
    { question: "In a system using segmentation, which of the following is not a part of a segment descriptor?", options: ["Segment number", "Base", "Limit", "Offset"], answer: "Offset" },
    { question: "Which of the following is a non-preemptive scheduling algorithm?", options: ["Round Robin", "Shortest Job First (SJF)", "Multilevel Queue", "Priority Scheduling"], answer: "Shortest Job First (SJF)" },
    { question: "Which of the following conditions is not necessary for deadlock to occur?", options: ["Mutual exclusion", "Hold and wait", "Preemption", "Circular wait"], answer: "Preemption" },
    { question: "In the context of I/O operations, what does “spooling” stand for?", options: ["Special polling of input/output layers", "Simultaneous Peripheral Operations On-Line", "Sequential Processing of Online Output List", "Serial Processing of Online Instructions"], answer: "Simultaneous Peripheral Operations On-Line" },
    { question: "Which of the following algorithms can lead to starvation?", options: ["First-Come, First-Served", "Round Robin", "Priority Scheduling", "Multilevel Feedback Queue with aging"], answer: "Priority Scheduling" },
    { question: "Which of the following statements about demand paging is FALSE?", options: ["It brings a page into memory only when it is needed", "It increases the degree of multiprogramming", "It reduces the effective memory access time", "It can cause thrashing if not properly managed"], answer: "It reduces the effective memory access time" },
    { question: "Which of the following is true regarding thrashing?", options: ["It is a condition where the CPU utilization increases due to more I/O operations", "It is caused when the system spends more time swapping pages than executing processes", "It occurs when all processes are in the ready queue", "It happens due to the large size of RAM"], answer: "It is caused when the system spends more time swapping pages than executing processes" },
    { question: "In Banker's algorithm, what is the main factor that determines whether a resource request can be granted?", options: ["Available resources", "Maximum need", "Total processes in system", "Safe state after allocation"], answer: "Safe state after allocation" }
  ],
  dbms: [
    { question: "What is DBMS?", options: ["Data Base Management System", "Digital Base Map Structure", "Data Block Mapping Service", "None"], answer: "Data Base Management System" },
    { question: "Which of these is a SQL command?", options: ["GET", "SELECT", "FETCH", "PULL"], answer: "SELECT" },
    { question: "Which of the following is a valid property of a transaction in the context of ACID properties?", options: ["Atomicity - All or nothing", "Consistency - Partial data changes allowed", "Isolation - Transactions must run sequentially", "Durability - Data lost on crash"], answer: "Atomicity - All or nothing" },
    { question: "In SQL, which of the following operations causes a Cartesian product?", options: ["INNER JOIN", "CROSS JOIN", "LEFT JOIN", "RIGHT JOIN"], answer: "CROSS JOIN" },
    { question: "Which of the following is NOT a valid normal form?", options: ["1NF", "2NF", "6NF", "5NF"], answer: "6NF" },
    { question: "Which type of index is best suited for range queries?", options: ["Hash Index", "B+ Tree Index", "Bitmap Index", "Clustered Index"], answer: "B+ Tree Index" },
    { question: "Which of the following relational algebra operations is not a set operation?", options: ["Union", "Intersection", "Difference", "Selection"], answer: "Selection" },
    { question: "In the context of transaction schedules, a schedule is conflict serializable if:", options: ["It contains no conflicting operations", "It is equivalent to some serial schedule", "It is free from cascading aborts", "It has no deadlocks"], answer: "It is equivalent to some serial schedule" },
    { question: "The anomaly that occurs when deleting data causes unintended loss of additional data is known as:", options: ["Insertion anomaly", "Deletion anomaly", "Update anomaly", "Projection anomaly"], answer: "Deletion anomaly" },
    { question: "Which SQL clause is used to restrict the number of rows returned by a query in most RDBMS?", options: ["WHERE", "HAVING", "GROUP BY", "LIMIT"], answer: "LIMIT" }
  ],
  cn: [
    { question: "Which layer in OSI model handles routing?", options: ["Transport", "Network", "Data Link", "Application"], answer: "Network" },
    { question: "Which device connects networks?", options: ["Switch", "Router", "Modem", "Repeater"], answer: "Router" },
    { question: "Which layer of the OSI model is responsible for end-to-end delivery of data?", options: ["Network Layer", "Transport Layer", "Data Link Layer", "Session Layer"], answer: "Transport Layer" },
    { question: "Which of the following protocols is used to assign IP addresses dynamically?", options: ["DNS", "DHCP", "ARP", "ICMP"], answer: "DHCP" },
    { question: "In which addressing mode is the destination IP address translated to a different address by a router or firewall?", options: ["Static Routing", "NAT", "DHCP", "Subnetting"], answer: "NAT" },
    { question: "What is the maximum number of hosts that can be assigned in a Class C network?", options: ["126", "256", "1024", "254"], answer: "254" },
    { question: "Which command is used to test the reachability of a host on an IP network?", options: ["tracert", "ping", "netstat", "ipconfig"], answer: "ping" },
    { question: "Which of the following routing algorithms can suffer from the count-to-infinity problem?", options: ["Link-State Routing", "Distance Vector Routing", "Path Vector Routing", "Hybrid Routing"], answer: "Distance Vector Routing" },
    { question: "Which protocol does not guarantee message delivery, ordering, or duplicate protection?", options: ["TCP", "UDP", "SCTP", "ICMP"], answer: "UDP" },
    { question: "What is the size of the TCP header without any options?", options: ["16 bytes", "20 bytes", "32 bytes", "24 bytes"], answer: "20 bytes" }
  ],
  prog: [
    { question: "Which language is used for web development?", options: ["Python", "HTML", "C++", "Java"], answer: "HTML" },
    { question: "In C++, which of the following is true about virtual functions?", options: ["They must be defined in the derived class", "They can't be private", "They support run-time polymorphism", "They are resolved at compile-time"], answer: "They support run-time polymorphism" },
    { question: "What is the time complexity of inserting an element into a Binary Search Tree (BST) on average and in the worst case?", options: ["Average: O(log n), Worst: O(log n)", "Average: O(n), Worst: O(n)", "Average: O(log n), Worst: O(n)", "Average: O(n), Worst: O(log n)"], answer: "Average: O(log n), Worst: O(n)" },
    { question: "Which Java concept allows multiple methods to have the same name but different parameters?", options: ["Method Overriding", "Method Overloading", "Polymorphism", "Inheritance"], answer: "Method Overloading" },
    { question: "Which data structure is best suited for implementing a priority queue?", options: ["Stack", "Queue", "Heap", "Linked List"], answer: "Heap" },
    { question: "Which of the following is a valid way to reverse a string in Python?", options: ["str[::-1]", "reverse(str)", "str.reverse()", "str.reverse(str)"], answer: "str[::-1]" },
    { question: "Which of the following sorting algorithms has the worst-case time complexity of O(n log n)?", options: ["Quick Sort", "Merge Sort", "Bubble Sort", "Insertion Sort"], answer: "Merge Sort" },
    { question: "Which data structure uses LIFO (Last In First Out)?", options: ["Queue", "Stack", "Array", "Linked List"], answer: "Stack" },
    { question: "Which keyword is used in Python to define a function?", options: ["function", "def", "define", "func"], answer: "def" },
    { question: "Which of the following is true about dynamic memory allocation in C?", options: ["malloc returns a pointer to an int", "malloc initializes memory to zero", "malloc returns a void pointer", "malloc allocates memory for strings only"], answer: "malloc returns a void pointer" }
  ],
  oops: [
    { question: "OOP stands for?", options: ["Object-Oriented Programming", "Optical Output Programming", "Object Operated Program", "None"], answer: "Object-Oriented Programming" },
    { question: "Which is not a pillar of OOP?", options: ["Encapsulation", "Inheritance", "Compilation", "Polymorphism"], answer: "Compilation" },
    { question: "What is the purpose of a constructor in a class?", options: ["To free resources used by the object", "To initialize objects of the class", "To declare member functions", "To create classes dynamically"], answer: "To initialize objects of the class" },
    { question: "Which access specifier makes members accessible only within the same class?", options: ["Public", "Protected", "Private", "Internal"], answer: "Private" },
    { question: "Function overloading is an example of:", options: ["Runtime polymorphism", "Compile-time polymorphism", "Inheritance", "Encapsulation"], answer: "Compile-time polymorphism" },
    { question: "Which of the following can be used to implement abstraction in OOP?", options: ["Classes and Objects", "Constructors", "Interfaces and Abstract Classes", "Destructors"], answer: "Interfaces and Abstract Classes" },
    { question: "In which situation would you use virtual functions?", options: ["To increase the speed of execution", "To overload a method", "To achieve dynamic dispatch in inheritance", "To prevent method overriding"], answer: "To achieve dynamic dispatch in inheritance" },
    { question: "What will happen if a class contains only private constructors?", options: ["It cannot be instantiated outside the class", "It can be instantiated anywhere", "It can only be inherited", "It is considered abstract"], answer: "It cannot be instantiated outside the class" },
    { question: "What is the output of calling a pure virtual function of an abstract class without overriding it in a derived class?", options: ["It returns a default value", "Compilation error", "Runtime error", "Segmentation fault"], answer: "Compilation error" },
    { question: "What does the Liskov Substitution Principle state?", options: ["Derived classes must override all methods of the base class", "Derived class objects must be replaceable for base class objects without affecting correctness", "Base classes should inherit from derived classes", "Subclasses should not access private members of the base class"], answer: "Derived class objects must be replaceable for base class objects without affecting correctness" }
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

function endQuiz() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("score").classList.remove("hidden");
  document.getElementById("restartBtn").classList.remove("hidden");
  document.getElementById("donutChart").classList.remove("hidden");
  document.getElementById("rank-display").classList.remove("hidden");

  document.getElementById("score").textContent = `${score}/${quizData[selectedTopic].length}`;

  const correct = score;
  const incorrect = quizData[selectedTopic].length - score;
  const ctx = document.getElementById("donutChart").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Correct", "Incorrect"],
      datasets: [{
        data: [correct, incorrect],
        backgroundColor: ["#4CAF50", "#f44336"],
        hoverOffset: 10
      }]
    }
  });

  const userRecord = { ...userData, score };
  users.push(userRecord);
  localStorage.setItem("quizUsers", JSON.stringify(users));
  renderResults();
  renderRanking(userRecord);
}

function renderResults() {
  const table = document.getElementById("results-table");
  table.innerHTML = `<tr><th>Name</th><th>Reg No</th><th>Email</th><th>Contact</th><th>Score</th><th>Action</th></tr>`;
  users.forEach((user, index) => {
    const row = `<tr>
      <td>${user.name}</td>
      <td>${user.regno}</td>
      <td>${user.email}</td>
      <td>${user.contact}</td>
      <td>${user.score}</td>
      <td><button class="delete-btn" onclick="deleteRecord(${index})">Delete</button></td>
    </tr>`;
    table.innerHTML += row;
  });
}

function renderRanking(currentUser) {
  const sorted = [...users].sort((a, b) => b.score - a.score);
  const rank = sorted.findIndex(u => u.regno === currentUser.regno) + 1;
  document.getElementById("rank-display").textContent = `Your rank: ${rank}`;

  const table = document.getElementById("ranking-table");
  table.innerHTML = `<tr><th>Rank</th><th>Name</th><th>Score</th></tr>`;
  sorted.forEach((user, index) => {
    table.innerHTML += `<tr><td>${index + 1}</td><td>${user.name}</td><td>${user.score}</td></tr>`;
  });
}

function deleteRecord(index) {
  users.splice(index, 1);
  localStorage.setItem("quizUsers", JSON.stringify(users));
  renderResults();
  renderRanking({ regno: userData.regno });
}

function restartQuiz() {
  location.reload();
}
