var game = require("./game.js");
var computerPlayer = false;
var gameStarted;

document.addEventListener('DOMContentLoaded', function() {
  newGame();
  var newGameButton = document.getElementById("new-game");
  newGameButton.onclick = newGame;
});


function newGame() {
  game.initGame();
  initGui();
}

function initGui() {
  initGuiBoard();
  setGameResultMessage("");
  setPlayerTurnMessage("Player 1");
  gameStarted = false;
  initOpponentCheckBox();
}

function initOpponentCheckBox() {
  var opponentCheckBox = document.getElementById("opponent");
  opponentCheckBox.checked = computerPlayer;
  opponentCheckBox.onclick = function() {
    if (!gameStarted) {
      computerPlayer = computerPlayer ? false : true;
    }
    this.checked = computerPlayer;
  }
}

function initGuiBoard() {
  for (var i = 0; i < game.getNumberOfRows(); ++i) {
    for (var j = 0; j < game.getNumberOfColumns(); ++j) {
      var cell = document.getElementById("cell" + i + j);
      cell.className = cell.className.replace(/player[12]/, "");
      cell.onclick = function() {
        gameStarted = true;
        updateBoard(this);
      }
    }
  }
}

function setGameResultMessage(msg) {
  var gameResultMessage = document.getElementById("game-result-message");
  gameResultMessage.textContent = msg
}

function setPlayerTurnMessage(msg) {
  var playerTurnMessage = document.getElementById("game-player-turn");
  playerTurnMessage.textContent = msg
}

function updateBoard(cell) {
  humanPlayerMovement(cell);

  if (computerPlayer) {
    computerPlayerMovement();
  }
}

function humanPlayerMovement(cell) {
  var cellNumber = cell.id.substring(4, 6);
  var columnNumber = cellNumber[1];
  drawCheckerInBoard(columnNumber);
}

function computerPlayerMovement() {
  var columnNumber = getRandomInt(0, game.getNumberOfColumns());
  drawCheckerInBoard(columnNumber);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function drawCheckerInBoard(columnNumber) {
  if (!game.hasEnded() && !game.allCellsInColumnFilledIn(columnNumber)) {
    var lastRowNumber = game.getLastFreeRow(columnNumber);
    var cellToColor = document.getElementById("cell" + lastRowNumber + "" + columnNumber);
    cellToColor.className += " player" + game.getPlayerNumber();

    game.playChecker(columnNumber, game.getPlayerNumber());
    var nextPlayer = game.getPlayerNumber() + 1 == 2 ? 2 : 1;
    game.setPlayerNumber(nextPlayer);
    setPlayerTurnMessage("Player " + nextPlayer);

    if (game.hasEnded()) {
      setGameResultMessage("Player " + game.getWinner() + " won")
    }
  }
}
