decrement: function (){
  number--;
  $("#countDown").html("<h2>" + "Time remaining: " + number + "</h2>");
  if (number === 0) {
    ++unansweredCounter;
    giantObject.nextQuestion();
  }
},
run: function (){
  intervalId = setInterval(giantObject.decrement, 1000);
},
stop: function(){
  number=11;
  clearInterval(intervalId);
  ++questionIndex;
},
