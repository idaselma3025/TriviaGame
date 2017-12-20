
//VARIABLES
var number = 11; //variable to set countdown number
var intervalId; //variable to hold decremented countdown number
var questionIndex = 0;//variable to hold current index of guesses array
var newGuess; //variable to hold newly created button to hold on item from the "guesses" Array
var winCounter=0; //variable to hold number of wins during round
var lossCounter=0; //variable to hold number of losses during round
var unansweredCounter=0;// variable to hold number o timeouts during round
var searchAnswer;
var answerSearch;
var giphyAnswer;
var newList; //variable to hold button unordered list
var questions = [
  {
    "question":"What was the name of Queen Elizabeth's sister?",
    "guesses":["Mary","Jane","Wilemina","Margaret"],
    "answer":"Margaret",
    "giphyId":["9LnxA8X7VSnbW","tHO6AF6e1tfm8"]
  },
  {
    "question":"How many children does Queen Elizabeth have?",
    "guesses":["two","none","four","three"],
    "answer":"four",
    "giphyId":["xULW8v0NAKXQjo3Kfu","n4uQI5M4lpWzm"]
  },
  {
    "question":"What year was Queen Elizabeth II crowned?",
    "guesses":["1957","1960","1949","1953"],
    "answer":"1953",
    "giphyId":["gskzHEG5SWM3m","QNHsUgzeuVWsU"]
  },
  {
    "question":"What was the Queen's role in WWII?",
    "guesses":["Queen","mechanic","ambassador","medic"],
    "answer":"mechanic",
    "giphyId":["xULW8GDfJGgpptCb4s","2k4CSOMmoFZYc"]
  },
  {
    "question":"Where does the Queen and her family live?",
    "guesses":["Buckingham Palace","King's Landing","Windsor Castle","Winterfell"],
    "answer":"Buckingham Palace",
    "giphyId":["3o7528Oqfsq6cyyjHW","cv6XZnaAjV408"]
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
  $("#answerList").empty();
  $("#answerScore").empty();
  questionIndex = 0;
  giantObject.renderQuestion();
  winCounter = 0;
  lossCounter = 0;
  unansweredCounter = 0;
})

var giantObject = {
  decrement: function (){
    number--;
    $("#countDown").html("<h2>" + "Time remaining: " + number + "</h2>");
    if (number === 0) {
      ++unansweredCounter;
      giantObject.nextQuestion();
      $("#question").text("Out of Time!");
      giantObject.rightAnswer();
      giphyAnswer = questions[questionIndex-1].giphyId[0];
      giantObject.searchGiphy(giphyAnswer);
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
    $(".gifs").remove();
    for (var i = 0; i<questions[questionIndex].guesses.length; i++){
      newGuess = $("<li>");
      newGuess.addClass("button");
      newGuess.attr("data-q", questions[questionIndex].guesses[i]);
      newGuess.text(questions[questionIndex].guesses[i]);
      $("#answerList").append(newGuess);
    }
  },
  findAnswers: function(){
    $(".button").on("click",function(){
      var tryGuess = ($(this).attr("data-q"));
      if (tryGuess === questions[questionIndex].answer){
        ++winCounter;
        giantObject.nextQuestion();
        $("#question").text("Correct! The Queen couldn't be happier with you!");
        giphyAnswer = questions[questionIndex-1].giphyId[1];
        giantObject.searchGiphy(giphyAnswer);

      }
      else if (tryGuess != questions[questionIndex].answer){
        // answerSearch = questions[questionIndex].answer;
        ++lossCounter;
        giantObject.nextQuestion();
        $("#question").text("Wrong!");
        giantObject.rightAnswer();
        giphyAnswer = questions[questionIndex-1].giphyId[0];
        giantObject.searchGiphy(giphyAnswer);
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
    $("#answerScore").append(winScore,lossScore, unansweredScore, playAgain);
  },
  nextQuestion: function(){
    giantObject.stop();
    giantObject.clearScreen();
    setTimeout(giantObject.renderQuestion,5000);
    number = 11;
  },
  stop: function(){
    clearInterval(intervalId);
    ++questionIndex;
  },
  clearScreen: function(){
    $("#question").empty();
    $(".button").remove();
    $(".gifs").remove();
  },
  rightAnswer: function(){
    var rightAnswer = $("<div>");
    searchAnswer = questions[questionIndex-1].answer;
    rightAnswer.addClass("correctAnswer");
    rightAnswer.text("The correct answer was " + searchAnswer);
    $("#question").append(rightAnswer);
  },
  searchGiphy : function(giphyAnswer){
    var queryURL = "https://api.giphy.com/v1/gifs/" + giphyAnswer + "?api_key=H5NnYWud8bpvU4ICC178EnuAHbGH056M";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(data) {
      var imgDiv = $("<img>").attr("src",data.data.images.downsized.url);
      imgDiv.addClass("gifs");
      $("#answers").append(imgDiv);
      // console.log(data);
    })
  }
};
