$(document).ready(function () {
  let body = $("body");
  let sentences = [
    "ten ate neite ate nee enet ite ate inet ent eate",
    "Too ato too nOt enot one totA not anot tOO aNot",
    "oat itain oat tain nate eate tea anne inant nean",
    "itant eate anot eat nato inate eat anot tain eat",
    "nee ene ate ite tent tiet ent ine ene ete ene ate",
  ];
  let numberOfWords = 55;
  let indexSentence = 0;
  let indexLetter = 0;
  let mistakesMade = 0;
  let timeStampStart = 0;
  let timeStampEnd = 0;
  let keysPressed = 0;

  let theSentence = sentences[0];
  let theLetter = theSentence[0];
  let targetLetterDiv = $("#target-letter");
  targetLetterDiv.text(theLetter);
  $("#sentence").append(sentences[indexSentence]);

  $("#keyboard-upper-container").toggle();

  //uppercase function
  $(document).keydown(function (event) {
    if (event.which === 16 || event.which === 20) {
      $("#keyboard-lower-container").hide();
      $("#keyboard-upper-container").toggle();
    }
  });
  $(document).keyup(function (event) {
    if (event.which === 16 || event.which === 20) {
      $("#keyboard-upper-container").hide();
      $("#keyboard-lower-container").toggle();
    }

    $(".highlight").removeClass("highlight");
  });

  $(document).keypress(function (event) {
    let keyPress = event.which;
    $("#" + keyPress).addClass("highlight");

    if (keysPressed < 1) {
      timeStampStart = event.timeStamp;
      keysPressed++;
    }

    let theSentence = sentences[indexSentence];
    let theLetter = theSentence[indexLetter];
    indexLetter++;
    let nextLetter = theSentence[indexLetter];
    targetLetterDiv.text(nextLetter);

    //moving the yellow block
    $("#yellow-block").animate(
      { left: "+=17.5px" },
      { duration: 1, easing: "linear" }
    );
    if (indexSentence < sentences.length) {
      if (indexLetter < theSentence.length) {
        if (event.which === theLetter.charCodeAt()) {
          $("#feedback").append("<span class='glyphicon glyphicon-ok'></span>");
        } else {
          $("#feedback").append(
            "<span class='glyphicon glyphicon-remove'></span>"
          );
          mistakesMade++;
        }
      } else if (indexSentence < sentences.length - 1) {
        $("#feedback").empty();
        indexSentence++;
        $("#sentence").text(sentences[indexSentence]);
        targetLetterDiv.text(sentences[indexSentence].charAt(0));
        indexLetter = 0;
        $("#yellow-block").animate(
          { left: "15px" },
          { duration: 1, easing: "linear" }
        );
      } else if (indexSentence < sentences.length) {
        timeStampEnd = event.timeStamp;
        let diff = timeStampEnd - timeStampStart;
        let time = Math.floor(diff / 1000) / 60;
        let wpm = Math.floor(numberOfWords / time - 2 * mistakesMade);
        $("#sentence").empty();
        $("#target-letter").empty();
        $("#feedback").empty();
        $("#yellow-block").hide();
        $("#sentence").append("The text is over");

        targetLetterDiv.append(replayButton).hide().delay(3000).fadeIn(500);
      }
    }
  });
});
