var buttonColours = ["red", "blue", "green", "yellow"];
var pattern = [];
var userPattern = [];
var pressed = 0;
var done = false;
function nextSequence(){
    number = Math.floor(Math.random() * 4);
    return number;
}

function randomChosenColour(){
    num = nextSequence();
    return buttonColours[num]
}

function nextSeq(){
    var newColor = randomChosenColour();
    pattern.push(newColor);
    pressed += 1;
    $("h1").text("Level " + pressed);
}
function sequence(){
    $("#" + pattern[pattern.length - 1]).fadeOut(100).fadeIn(100);
    playSound(pattern[pattern.length - 1]);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(curColor){
    $("#" + curColor).addClass("pressed");
    setTimeout(function () {
        $("#" + curColor).removeClass("pressed");
      }, 100);
}

$(".btn").click(function(){
    expected = pattern[userPattern.length];
    curColour = $(this).attr("id");
    userPattern.push(curColour);
    playSound(curColour);
    animatePress(curColour);
    if(expected == curColour && pattern.length == userPattern.length){
        setTimeout(function () {
            userPattern = []
            nextSeq();
            sequence();
          }, 1000);
    }
    else if(expected != curColour){
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart")
            done = true;
          }, 200);
    }
    
});

$("*").keypress(function(event){
    if(pressed == 0){
        $("h1").text("Level " + pressed);
        nextSeq();
        sequence();
    }
    if(done){
        startOver();
    }

});

function startOver(){
    pressed = 0;
    pattern = [];
    userPattern = [];
    done = false;
}





