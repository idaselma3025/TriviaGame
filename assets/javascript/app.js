
//timeout stuff
var number = 10;

var intervalId;

function run() {
  intervalId = setInterval(decrement, 1000);
}

function decrement() {
  number--;
  $("#countDown").html("<h2>" + number + "</h2>");
  if (number === 0) {
    ++unansweredCounter;
    stop();
    clearScreen();
    $("#question").text("Out of Time!");
    setTimeout(renderQuestion,3000);
    number =10;
  }
}

function stop() {
  clearInterval(intervalId);
  ++questionIndex;
}

// run();

//question display stuff
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
];

var questionIndex = 0;
var newGuess;
function renderQuestion(){
  if (questionIndex <= (questions.length-1)){
    $("#question").text(questions[questionIndex].question);
    createButtons();
    findAnswers();
    run();
  }
  else{
clearScreen();
$("#question").text("All Done Here's How You Did");
var winScore =$("<div>");
var lossScore =$("<div>");
var unansweredScore =$("<div>");
winScore.text("Correct Answers: " +winCounter);
lossScore.text("Wrong Answers: " + lossCounter);
unansweredScore.text("Timeout Answers: " +unansweredCounter);
$("#answers").append(winScore,lossScore, unansweredScore);
  }
};

function createButtons(){
  for (var i = 0; i<questions[questionIndex].guesses.length; i++){
    newGuess = $("<button>");
    newGuess.addClass("button");
    newGuess.attr("data-q", questions[questionIndex].guesses[i]);
    newGuess.text(questions[questionIndex].guesses[i]);
    $("#answers").append(newGuess);

  }
}
renderQuestion();

var winCounter=0;
var lossCounter=0;
var unansweredCounter=0;

function findAnswers(){
$(".button").on("click",function(){
  var tryGuess = ($(this).attr("data-q"));
  if (tryGuess === questions[questionIndex].answer){
    ++winCounter;
     clearScreen();
     stop();
     $("#question").text("Correct!");
     setTimeout(renderQuestion, 3000);
     number=10;
  }
  else{
    ++lossCounter;
     clearScreen();
     stop();
     $("#question").text("Wrong!");
     setTimeout(renderQuestion,3000);
     number=10;
  }
});
};
function clearScreen(){
  $("#question").empty();
  $(".button").remove();
}
