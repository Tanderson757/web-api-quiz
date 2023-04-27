var quizQuestions = [
    {
      question: "Commonly used data types DO NOT include:",
      possibleAnswers: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
      correct: 3,
    },
    {
      question:
        "The condition in an if / else statement is enclosed within _____",
      possibleAnswers: [
        "1. Quotes",
        "2. Curly Brackets",
        "3. Parenthesis",
        "4. Square Brackets",
      ],
      correct: 3,
    },
    {
      question: "Arrays in JavaScript can be used to store _____",
      possibleAnswers: [
        "1. Numbers and Strings",
        "2. Other Arrays",
        "3. Booleans",
        "4. All of the Above",
      ],
      correct: 4,
    },
    {
      question:
        "String values must be enclosed within _____ when being assigned to variables.",
      possibleAnswers: [
        "1. Commas",
        "2. Curly Brackets",
        "3. Quotes",
        "4. Parenthesis",
      ],
      correct: 3,
    },
    {
      question:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      possibleAnswers: [
        "1. JavaScript",
        "2. Terminal/Bash",
        "3. For Loops",
        "4. Console.log",
      ],
      correct: 4,
    },
  ];
  // Used as a counter for which question user is on
  var i = 0;
  
  var answerChoice = 0;
  var correctAnswer =0;
  var timer = 100;
  var submitScore = {
    name: [],
    score: [],
  };
  var retrieveScore = JSON.parse(localStorage.getItem("Score"));
  
  
  
  $(document).ready(function () {
    $("p").hide();
    $("form").hide();
    $("#timer").hide();
    $("#high-scores-container").hide();
  });
  
  $("#question").text("Welcome to the API Code Quiz! Click the button to begin!");
  $("#footer").text("WARNING: Incorrect answers will deduct 10 seconds!");
  
  $("#start").on("click", function () {
    $("p").show();
    $("#footer").hide();
    $("h3").hide();
    $("#timer").show();
    startTimer();
    nextQuestion();
  });
  
  $("#answer1").on("click", function () {
    answerChoice = 1;
    checkAnswer();
    });
  
  $("#answer2").on("click", function () {
    answerChoice = 2;
    checkAnswer();
  });
  
  $("#answer3").on("click", function () {
    answerChoice = 3;
    checkAnswer();
  });
  
  $("#answer4").on("click", function () {
    answerChoice = 4;
    checkAnswer();
  });
  
  $("#leaderboard-link").on("click", function() {
    highScores();
  });
  
  
  function nextQuestion() {
    $("#question").text(quizQuestions[i].question);
    $("#answer1").text(quizQuestions[i].possibleAnswers[0]);
    $("#answer2").text(quizQuestions[i].possibleAnswers[1]);
    $("#answer3").text(quizQuestions[i].possibleAnswers[2]);
    $("#answer4").text(quizQuestions[i].possibleAnswers[3]);
    correctAnswer = quizQuestions[i].correct;
      i++;
  }
  
  function checkAnswer() {
    if (answerChoice === correctAnswer){
      $("#footer").show();
      $("#footer").text("GOOD JOB!");
      $("#footer").fadeOut(2000);
      nextQuestion();
      if (i >= quizQuestions.length) {
        endQuiz();
      }
  
    } else {
      $("#footer").show();
      $("#footer").text("INCORRECT!");
      $("#footer").fadeOut(2000);
      timer -= 10;
      nextQuestion();
      if (i >= quizQuestions.length) {
        endQuiz();
      }
    }
  }
  
  function endQuiz() {
    $("#question").text("GAME OVER! Now submit your score!");
    $("p").hide();
    $("form").show();
    stopTimer();
    $("#timer").hide();
    $("#final-score").attr("value", timer);
  
    $("#submit").on("click", function() {
      event.preventDefault();
      if (retrieveScore !== null) {
        highScoreName = $("#name").val();
      submitScore.name.push(retrieveScore.name);
      submitScore.score.push(retrieveScore.score);
      submitScore.name.push(highScoreName);
      submitScore.score.push(timer);
      localStorage.setItem("Score", JSON.stringify(submitScore));
  
      console.log("PREVIOUS DATA IN STORAGE!")
      console.log(submitScore);
  
      highScores();
      
      } else {
  
      highScoreName = $("#name").val();
      submitScore.name.push(highScoreName);
      submitScore.score.push(timer);
      localStorage.setItem("Score", JSON.stringify(submitScore));
      console.log("NO PREVIOUS DATA IN STORAGE")
      console.log(submitScore);
  
  
      highScores();
      }
    })
  
  }
  
  function startTimer() {
  timerInterval = setInterval(function() {
  timer--;
    $("#timer").text(timer);
  }, 1000);
  }
  
  function stopTimer() {
    clearInterval(timerInterval);
  }
  
  function highScores () {
    $("#main-container").hide();
    $("#high-scores-container").show();
    retrieveScore = JSON.parse(localStorage.getItem("Score"));
  }