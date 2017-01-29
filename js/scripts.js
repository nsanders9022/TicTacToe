var playerArray = [];
var currentGame;
var onePlayer = false;
var gamesArray = [];
var similarArrays = [];

//Game constructor
function Game(player1, player2, onePlayer, computerPlayer) {
  this.valueVector = [0,0,0,0,0,0,0,0,0]; //represents the positions in the game board
  this.gameState = true; //if true, game is still in sesson- no tie or win yet
  this.playerState = 0; //determines whose turn it is.
  this.playerArray = []; // array of players
  this.playerArray.push(player1, player2, computerPlayer); // adds players to the player array
  this.currentPlayer = playerArray[this.playerState] //gets index of the current player in the player array
  this.winner = "It's a tie"; // default text when the game is over
  this.winnerId;
  this.computerPerfomance;
  this.onePlayer = onePlayer; //property to see if one person is playing
}

// Player constructor
function Player(playerName, identifier) {
  this.playerName = playerName;
  this.identifier = identifier;
  playerArray.push(this); //adds the entire player object into the player array
  this.winsTotal = 0; //default to 0 wins
  this.humanPlayer = true; //default to being a human player
}

//generates a random number for where the computer should play
Game.prototype.randomNumber = function() {
  var computerMove = Math.floor(Math.random()*9); //gets random number between 0 and 8
  while (this.valueVector[computerMove] != 0) { //while the square (identified by the random number as the index for the valueVector) is not available (??)
    computerMove = Math.floor(Math.random()*9); //the computer plays there
  }
  return computerMove;
};

//Set up for one player vs the computer
Game.prototype.onePlayerSetup = function() {
  if (this.onePlayer === true) { //refers to default value in game constructor
    this.playerArray.splice(1,1); //removes player2 from the array of players
  } else {                  //done if 2 people are playing
    this.playerArray.pop(); // removes the computer player from the array of player1,player2,computerplayer
  }
}

//Switches between one player and the next
Game.prototype.stateSwitch = function() {
  if (this.playerState === 0) {
    this.playerState = 1; //Player one ends turn
  } else {
    this.playerState = 0; //Player one gets turn again
  }
}

//Shows the game board
Game.prototype.printBoard = function(outputLocation) {
  var topRow = [];
  var midRow = [];
  var bottomRow = [];
  for (var i = 0; i < this.valueVector.length; i++) {
    if (i < 3) {
      topRow.push(this.valueVector[i]); // pushes the firsst 3 numbers in the array of game places to top row
    } else if (i < 6) {
      midRow.push(this.valueVector[i]); // pushes to middle row
    } else {
      bottomRow.push(this.valueVector[i]); //pushes to bottom row.
    }
  }
  $(outputLocation).append(topRow); //adds top row to html
  $(outputLocation).append("<br>");
  $(outputLocation).append(midRow); //adds middle row to html
  $(outputLocation).append("<br>");
  $(outputLocation).append(bottomRow); //adds bottom row to html
}

//Checks to see if there is a winner
Game.prototype.checkWin = function() {
  var firstElement = this.valueVector[0]; //gets top left corner
  var winIndex;
  var winner = false; //default to there being no winner
  var completeGame = true; //default to a game being completed
  for (var index = 0; index < 7; index += 3) { //goes through each row
    if (this.valueVector[index] === this.valueVector[index + 1] && this.valueVector[index] === this.valueVector[index + 2] && this.valueVector[index] != 0) {
      winner = true; //there is a winner if one of the rows  is all the same
      winIndex = this.valueVector[index];
    }
  }
  for (var index = 0; index < 3; index += 1) { //goes through all the columns
    if (this.valueVector[index] === this.valueVector[index + 3] && this.valueVector[index] === this.valueVector[index + 6] && this.valueVector[index] != 0) {
      winner = true; //winner of a column is all the same
      winIndex = this.valueVector[index];
    }
  }
  for (var index = 2; index < 5; index += 2) { //goes through the diagonals
    if (this.valueVector[4] === this.valueVector[4 + index] && this.valueVector[4] === this.valueVector[4 - index] && this.valueVector[4] != 0) {
      winner = true; //winner if diagonals are the same
      winIndex = this.valueVector[index];
    }
  }
  if (winner === true) { //if someone won...
    this.winner = this.playerArray[winIndex-1].playerName + " " + "is the winner!"; //display which player one
    this.winnerId = this.playerArray[winIndex-1].identifier;
    if (this.onePlayer === true && this.winnerId === 2) { //if the computer won
      this.computerPerfomance = 2; //give this location +2
    } else {
      this.computerPerfomance = (-2); //give this location -2
    }
  }
  return winner;
}

//checks for a tie
Game.prototype.checkComplete = function () {
  var completeGame = true;

  for (var index = 0; index < 9; index++) {
    if (this.valueVector[index] === 0) { //if any of the spots are not taken yet game isn't over
      completeGame = false;
      break;
    }
  }
  return completeGame //if they are all full then game is done
};

//checks to see if a game is over
Game.prototype.checkOver = function () {
  if (this.checkWin() === true) { //if someone won then the game is over
    return true;
  } else if (this.checkComplete() === true) { //if the game is tied the game is over
      this.computerPerfomance = 1;
      return true;
  } else {
    return this.checkComplete();
  }
};

//adds total to the winners score and adds gameboard to array of all game boards
Game.prototype.cleanUp = function() {
  for (var index = 0; index < this.playerArray.length; index++) {
    if (this.winnerId === this.playerArray[index].identifier) { // adds 1 to the score of the winner
      this.playerArray[index].winsTotal += 1;
    }
  }
  gamesArray.push([this.valueVector, this.computerPerfomance]) //adds game board to array of games
  similarArrays = [];
}

//inserts the chosen image to the chosen spot
Game.prototype.imageInsert = function(imageId, targetId) {
  $(targetId).append($(imageId).clone()) //clones the image the player chose and appends it to a location
}

//sees if there are any similar games in the array of games
Game.prototype.findSimilar = function(arrayOfArrays) {
  for (var arraysIterator = 0; arraysIterator < arrayOfArrays.length; arraysIterator++) {
    var same = true;
    for (var currentIndex = 0; currentIndex < this.valueVector.length; currentIndex++) {
      if (this.valueVector[currentIndex] != 0 && arrayOfArrays[arraysIterator][0][currentIndex] != this.valueVector[currentIndex]) {
        same = false; // games are not similar
      }
    }
    if (same === true) {
      similarArrays.push(arrayOfArrays[arraysIterator]) //if the game is similar then add it to the similar games array
    }
  }
}

//sees if there is a valid move to make (????)
Game.prototype.evaluateMoves = function(similarArrays) {
  var evaluator = [0,0,0,0,0,0,0,0,0];
  for (var jdex = 0; jdex < this.valueVector.length; jdex++) {
    if (this.valueVector[jdex] != 0) { //if the spot has already been taken then an x is added to the evaluator array
      evaluator[jdex] = ('X');
    }
  }
  for (var index = 0; index < similarArrays.length; index++) {
    for (movesIndex = 0; movesIndex < this.valueVector.length; movesIndex++) {
      if (similarArrays[index][0][movesIndex] === 2 && this.valueVector[movesIndex] === 0) {
        evaluator[movesIndex] += similarArrays[index][1];
      }
    }
  }
  return evaluator;
}

//finds best move
Game.prototype.bestMove = function(evaluator) {
  var bestPositionValue = (-10000);
  var moveChoices = []
  for (var index = 0; index < evaluator.length; index++) {
    if (typeof(evaluator[index]) === "number") {
      if (evaluator[index] > bestPositionValue) {
        moveChoices = [];
        moveChoices.push(index);
        bestPositionValue = evaluator[index];
      } else if (evaluator[index] === bestPositionValue) {
        moveChoices.push(index);
      }
    }
  }
  var bestMove = Math.floor(Math.random() * moveChoices.length);
  return moveChoices[bestMove];
}


$(document).ready(function() {
  var player1Image = $("#x"); //sets default value of player image to x
  var player2Image = $("#robot");//sets default value of computer image to robot

  $(".player-1-image").click(function() { //when player 1 is selecting an image
    $(this).siblings().removeClass("highlight");
    $(this).addClass("highlight"); //the clicked on immage is highlighted
    player1Image = $(this); //this becomes player ones image
  })
  $(".player-2-image").click(function() { //same as above for player 2
    $(this).siblings().removeClass("highlight");
    $(this).addClass("highlight");
    player2Image = $(this);
  })

  $(".player-numbers").click(function() {
    var playerChoice = $(this).attr('id'); //gets id of the button that was selected - one player or 2 players
    $(".players-landing-page").hide(); //hids the landing page
    $("#name-players").show(); //displays page where player(s) can put in their name and select their image
    if (playerChoice === "one-player") { //if button for one player was clicked (identified by the id equal to one player)
      $(".player2-hidden").hide(); //hide the section for the second player to enter name and click image
      onePlayer = true; //set one player to true
    }
  })

  $("#get-names").submit(function(event) { //when name(s) are submitted
    event.preventDefault();

    $("#x").empty();
    player1Image = player1Image.clone() //chosen image becomes the players image
    player1Image.removeClass("symbol-pic highlight");
    player1Image.addClass("symbol");
    $("#x").append(player1Image);

    $("#o").empty();
    player2Image = player2Image.clone() //chosen image becomes the players image
    player2Image.removeClass("symbol-pic highlight");
    player2Image.addClass("symbol");
    $("#o").append(player2Image);

    $(".entire-game").show(); //displays boardgame
    $(".landing-page").hide(); //hides name/pic page
    var player1 = new Player($("#player-1").val(), 1); //new object created with inputted name and player1 identifier
    var player2 = new Player($("#player-2").val(), 2); //new object created with inputted name and player2 identifier
    var computerPlayer = new Player("Computer", 2); //new computer player object created
    computerPlayer.humanPlayer = false; //sets human player to false for the computer player object
    var game1 = new Game(player1, player2, onePlayer, computerPlayer); //new game object
    game1.onePlayerSetup(); //runs function to remove player 2 from array of players so that one person and the computer can play
    currentGame = game1;

    $(".position").click(function() {
      similarArrays = [];

      var currentDiv = $(this); //chooses the selected div
      var vectorIndex = parseInt(currentDiv.attr('id')); //gets the location of the selected div by referring to it's id value
      if (currentGame.valueVector[vectorIndex] === 0 && currentGame.gameState === true) { //if the div has not yet been selected and the game is still going on...
        if (currentGame.playerState === 0 && currentGame.onePlayer === true) { //if it is the humans turn and only one player...
          currentGame.imageInsert("#x", $(this)); //insert the player's chosen image to the div
          currentGame.valueVector[vectorIndex] = currentGame.playerState+1; //switch players to make it the next person's turn
          if (currentGame.checkOver() === false) { //if the game isn't over yet
            currentGame.findSimilar(gamesArray); //the computer looks at the similar games in the game array
            var eval = currentGame.evaluateMoves(similarArrays); //and evaluates its moves
            var computerMove = currentGame.bestMove(eval); //plays the best move
            console.log(eval);
            currentGame.imageInsert("#o", "#" + computerMove); //inserts the image to the chosen div
            currentGame.valueVector[computerMove] = 2; //adds a 2 to the location in the value vector that the computer played
          }
        } else if (currentGame.playerState === 0) { //if the location has not been taken yet and there are two human players
          currentGame.imageInsert("#x", $(this)); //insert image from player one
          currentGame.valueVector[vectorIndex] = currentGame.playerState+1; //changes to the next player's turn
          currentGame.stateSwitch();
        } else {
          currentGame.imageInsert("#o", $(this)); //puts player 2s image in
          currentGame.valueVector[vectorIndex] = currentGame.playerState+1;
          currentGame.stateSwitch(); //changes back to player 1
        }
        if (currentGame.checkOver() === true){ //if the game is over
          currentGame.cleanUp(); //add 1 to winners score and adds game to the array of games
          $("#game-over-text").text(currentGame.winner); //displays the winners name, or it's a tie
          currentGame.gameState = false; //make the game over
          $("#game-over").show();
          $("#player-1-name").text(currentGame.playerArray[0].playerName); //displays player1s name
          $("#player-1-wins").text(currentGame.playerArray[0].winsTotal); //displays player1s total wins
          $("#player-2-name").text(currentGame.playerArray[1].playerName); //displays player2s name
          $("#player-2-wins").text(currentGame.playerArray[1].winsTotal); //displays player2s total wins
        }
      }
    })

    $(".replay").click(function(){ //when the player wants to play again
      var newGame = new Game(player1, player2, onePlayer, computerPlayer); //a new game object is created
      newGame.onePlayerSetup(); //the game is set up
      currentGame = newGame;
      $("#game-over").hide(); //the winning name and scores page is hidden
      $(".entire-game").find(".position").empty(); //all of the position divs with images are emptied
    })
  })

})
