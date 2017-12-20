
//VARIABLES
var number = 10; //variable to set countdown number
var intervalId; //variable to hold decremented countdown number
var questionIndex = 0;//variable to hold current index of guesses array
var newGuess; //variable to hold newly created button to hold on item from the "guesses" Array
var winCounter=0; //variable to hold number of wins during round
var lossCounter=0; //variable to hold number of losses during round
var unansweredCounter=0;// variable to hold number o timeouts during round
var searchAnswer;
var answerSearch;
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
  giantObject.renderQuestion();
})
$(document).on("click",".replay",function(){
  giantObject.clearScreen();
  $("#answers").empty();
  questionIndex = 0;
  giantObject.renderQuestion();
  winCounter = 0;
  lossCounter = 0;
  unansweredCounter = 0;
})

var giantObject = {
  decrement: function (){
    number--;
    $("#countDown").html("<h2>" + number + "</h2>");
    if (number === 0) {
      ++unansweredCounter;
      giantObject.nextQuestion();
      $("#question").text("Out of Time!");
      giantObject.rightAnswer();
    }
  },
  run: function (){
    intervalId = setInterval(giantObject.decrement, 1000);
  },
  renderQuestion: function(){
    $(".correctAnswer").remove();
    if (questionIndex <= (questions.length-1)){
      $("#question").text(questions[questionIndex].question);
      giantObject.createButtons();
      giantObject.findAnswers();
      giantObject.run();
    }
    else{
      giantObject.clearScreen();
      giantObject.endGame();
    }
  },
  createButtons: function (){
    for (var i = 0; i<questions[questionIndex].guesses.length; i++){
      newGuess = $("<button>");
      newGuess.addClass("button");
      newGuess.attr("data-q", questions[questionIndex].guesses[i]);
      newGuess.text(questions[questionIndex].guesses[i]);
      $("#answers").append(newGuess);

    }
  },
  findAnswers: function(){
    $(".button").on("click",function(){
      var tryGuess = ($(this).attr("data-q"));
      if (tryGuess === questions[questionIndex].answer){
        ++winCounter;
        giantObject.nextQuestion();
        $("#question").text("Correct!");
      }
      else if (tryGuess != questions[questionIndex].answer){
        // answerSearch = questions[questionIndex].answer;
        ++lossCounter;
        giantObject.nextQuestion();
        $("#question").text("Wrong!");
        giantObject.rightAnswer();
        giantObject.searchGiphy(searchAnswer);
      }
    });
  },
  endGame: function(){
    $("#question").text("All Done Here's How You Did");
    var winScore =$("<div>");
    var lossScore =$("<div>");
    var unansweredScore =$("<div>");
    var playAgain = $("<button>");
    playAgain.addClass("replay");
    playAgain.text("Press to Play Again!");
    winScore.text("Correct Answers: " +winCounter);
    lossScore.text("Wrong Answers: " + lossCounter);
    unansweredScore.text("Timeout Answers: " +unansweredCounter);
    $("#answers").append(winScore,lossScore, unansweredScore, playAgain);
  },
  nextQuestion: function(){
    giantObject.stop();
    giantObject.clearScreen();
    setTimeout(giantObject.renderQuestion,3000);
    number = 10;
  },
  stop: function(){
    clearInterval(intervalId);
    ++questionIndex;
  },
  clearScreen: function(){
    $("#question").empty();
    $(".button").remove();
  },
  rightAnswer: function(){
    var rightAnswer = $("<div>");
    searchAnswer = questions[questionIndex-1].answer;
    rightAnswer.addClass("correctAnswer");
    rightAnswer.text("The correct answer was " + searchAnswer);
    $("#answers").append(rightAnswer);
  },
  searchGiphy : function(searchAnswer){
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchAnswer + "&api_key=H5NnYWud8bpvU4ICC178EnuAHbGH056M";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    giantObject.createImage(response);
  })
},
createImage : function(data){
  var wrongImage = $('<div><img src="' + data.url + '" /></div>');
  $("#answers").append(wrongImage);
}
};
