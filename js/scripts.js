var playerArray = []

function Game(playerArray) {
  this.valueVector = [0,0,0,0,0,0,0,0,0];
  this.gameState = true;
  this.playerState = 0;
  this.playerArray = playerArray;
  this.currentPlayer = playerArray[this.playerState]
}

function Player(playerName, symbol, game) {
  this.playerName = playerName;
  this.symbol = symbol;
  playerArray.push(this)
}

Game.prototype.stateSwitch = function() {
  if (this.playerState === 0) {
    this.playerState = 1;
  } else {
    this.playerState = 0;
  }
}

Game.prototype.printBoard = function(outputLocation) {
  var topRow = [];
  var midRow = [];
  var bottomRow = [];
  for (var i = 0; i < this.valueVector.length; i++) {
    if (i < 3) {
      topRow.push(this.valueVector[i]);
    } else if (i < 6) {
      midRow.push(this.valueVector[i]);
    } else {
      bottomRow.push(this.valueVector[i]);
    }
  }
  $(outputLocation).append(topRow);
  $(outputLocation).append("<br>");
  $(outputLocation).append(midRow);
  $(outputLocation).append("<br>");
  $(outputLocation).append(bottomRow);
}

Game.prototype.checkWin = function() {
  var firstElement = this.valueVector[0];
  var over = false;
  for (var index = 0; index < 7; index += 3) {
    if (this.valueVector[index] === this.valueVector[index + 1] && this.valueVector[index] === this.valueVector[index + 2] && this.valueVector[index] != 0) {
      over = true;
    }
  }
  for (var index = 0; index < 3; index += 1) {
    if (this.valueVector[index] === this.valueVector[index + 3] && this.valueVector[index] === this.valueVector[index + 6] && this.valueVector[index] != 0) {
      over = true;
    }
  }
  for (var index = 2; index < 5; index += 2) {
    if (this.valueVector[4] === this.valueVector[4 + index] && this.valueVector[index] === this.valueVector[4 - index] && this.valueVector[index] != 0) {
      over = true;
    }
  }
  return over;
}


$(document).ready(function() {
  var player1 = new Player("Sam", "X");
  var player2 = new Player("Nicole", "O");
  var game1 = new Game(playerArray);

  game1.printBoard("#board");

  $(".move-button").click(function() {
    var vectorIndex = parseInt($(this).val());
    if (game1.valueVector[vectorIndex] === 0) {
      game1.valueVector[vectorIndex] = game1.playerArray[game1.playerState].symbol;
      $("#board").empty();
      game1.printBoard("#board");
      if (game1.checkWin() === true){
        $("#board").hide();
        $("#game-over").show();
      }
      game1.stateSwitch();
    }
  })

})
