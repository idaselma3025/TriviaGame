
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
    stop();
    alert("Time Up!");
  }
}

function stop() {
  clearInterval(intervalId);
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
  }
  else{
clearScreen();
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
    ++questionIndex;
     clearScreen();
     $("#question").text("Correct!");
     setTimeout(renderQuestion, 3000);
  }
  else{
    ++lossCounter;
    ++questionIndex;
     clearScreen();
     $("#question").text("Wrong!");
     setTimeout(renderQuestion,3000);
  }
});
};
function clearScreen(){
  $("#question").empty();
  $(".button").remove();
}
