//VARIABLES
var number = 10; //variable to set countdown number
var intervalId; //variable to hold decremented countdown number
var questionIndex = 0;//variable to hold current index of guesses array
var newGuess; //variable to hold newly created button to hold on item from the "guesses" Array
var winCounter=0; //variable to hold number of wins during round
var lossCounter=0; //variable to hold number of losses during round
var unansweredCounter=0;// variable to hold number o timeouts during round
var questions = [
  {
    "question":"What the name of Queen Elizabeth's sister?",
    "guesses":["Mary","Jane","Wilemina","Margaret"],
    "answer":"Margaret"
  },
  {
    "question":"How many children did Queen Elizabeth have?",
    "guesses":["four","none","two","three"],
    "answer":"four"
  },
  {
    "question":"What year was Queen Elizabeth II crowned?",
    "guesses":["1953","1960","1949","1957"],
    "answer":"1953"
  },
  {
    "question":"What was the Queen's role in WWII?",
    "guesses":["Queen","mechanic","ambassador","medic"],
    "answer":"mechanic"
  },
  {
    "question":"Where does the Queen and her family live?",
    "guesses":["Buckingham Palace","King's Landing","Windsor Castle","Winterfell"],
    "answer":"Buckingham Palace"
  },
]; //question array

//getting Started function
$(".start").on("click",function(){
  $(".main").show();
  $(".start").hide();
  renderQuestion();
});

// $("button").on("click", function(){
//   renderQuestion();
// });

//function to set countdown
function decrement() {
  number--;
  $("#countDown").html("<h2>" + number + "</h2>");
  if (number === 0) {
    ++unansweredCounter;
    nextQuestion();
    $("#question").text("Out of Time!");
  }
}
//function to run countdown
function run() {
  intervalId = setInterval(decrement, 1000);
}
//function to cycle through questions until there aren't any left
function renderQuestion(){
  if (questionIndex <= (questions.length-1)){
    $("#question").text(questions[questionIndex].question);
    createButtons();
    findAnswers();
    run();
  }
  else{
    clearScreen();
    endGame();
  }
};
//function to create the corresponding buttons for "question" from "guesses"
function createButtons(){
  for (var i = 0; i<questions[questionIndex].guesses.length; i++){
    newGuess = $("<button>");
    newGuess.addClass("button");
    newGuess.attr("data-q", questions[questionIndex].guesses[i]);
    newGuess.text(questions[questionIndex].guesses[i]);
    $("#answers").append(newGuess);

  }
}
//function to compare the button clicked to the right answer
function findAnswers(){
  $(".button").on("click",function(){
    var tryGuess = ($(this).attr("data-q"));
    if (tryGuess === questions[questionIndex].answer){
      ++winCounter;
      nextQuestion();
      $("#question").text("Correct!");
    }
    else{
      ++lossCounter;
      nextQuestion();
      $("#question").text("Wrong!");
    }
  });
};
//function to display last screen of the game
function endGame(){
  $("#question").text("All Done Here's How You Did");
  var winScore =$("<div>");
  var lossScore =$("<div>");
  var unansweredScore =$("<div>");
  var playAgain = $("<button>")
  playAgain.text("Press to Play Again!");
  playAgain.addClass("replay");
  winScore.text("Correct Answers: " +winCounter);
  lossScore.text("Wrong Answers: " + lossCounter);
  unansweredScore.text("Timeout Answers: " +unansweredCounter);
  $("#answers").append(winScore,lossScore, unansweredScore, playAgain);
};
//function to move to next question
function nextQuestion(){
  stop();
  clearScreen();
  setTimeout(renderQuestion,3000);
  number = 10;
}
//function to stop the countdown after timeout and increase questionIndex
function stop() {
  clearInterval(intervalId);
  ++questionIndex;
}
//function to prep screen to display right/wrong info
function clearScreen(){
  $("#question").empty();
  $(".button").remove();
}
