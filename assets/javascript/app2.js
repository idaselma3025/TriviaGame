var giantObject = {
  decrement: function (){
    number--;
    $("#countDown").html("<h2>" + number + "</h2>");
    if (number === 0) {
      ++unansweredCounter;
      nextQuestion();
      $("#question").text("Out of Time!");
    }
  },
  run: function (){
    intervalId = setInterval(giantObject.decrement, 1000);
  },
  renderQuestion: function(){
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
      else{
        ++lossCounter;
        giantObject.nextQuestion();
        $("#question").text("Wrong!");
      }
    });
  },
  endGame: function(){
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
  },
  nextQuestion: function(){
    giantObject.stop();
    giantObject.clearScreen();
    setTimeout(renderQuestion,3000);
    number = 10;
  },
  stop: function(){
    clearInterval(intervalId);
    ++questionIndex;
  },
  clearScreen: function(){
    $("#question").empty();
    $(".button").remove();
  }
};
