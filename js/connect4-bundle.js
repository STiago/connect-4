(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./game.js":2}],2:[function(require,module,exports){
exports.getNumberOfRows=getNumberOfRows;
exports.getNumberOfColumns=getNumberOfColumns;
exports.gameFinished = gameFinished;
exports.winner= winner;
exports.playerNumber = playerNumber;
exports.playChecker = playChecker;
exports.initGame = initGame;
exports.allCellsInColumnFilledIn = allCellsInColumnFilledIn;
exports.hasEnded = hasEnded;
exports.getPlayerNumber=getPlayerNumber;
exports.getWinner = getWinner;
exports.getLastFreeRow=getLastFreeRow;
exports.setPlayerNumber=setPlayerNumber;

function getWinner(){
  return winner;
}

function getPlayerNumber(){
  return playerNumber;
}

function setPlayerNumber(number){
  playerNumber = number;
}

function hasEnded(){
  return gameFinished;
}

function getLastFreeRow(columnNumber){
  return lastFreeRowPerColumn[columnNumber];
}

function getNumberOfRows(){
  return NUMBER_OF_ROWS;
}

function getNumberOfColumns(){
  return NUMBER_OF_COLUMNS;
}

function allCellsInColumnFilledIn(columnNumber){
  var lastRowNumber = lastFreeRowPerColumn[columnNumber];
  return lastRowNumber < 0;
}

var NUMBER_OF_ROWS = 6;
var NUMBER_OF_COLUMNS = 7;

var rulesChecker = require("./rules_checker.js");
var gameFinished;
var lastFreeRowPerColumn;
var winner;
var playerNumber;
var board;


function playChecker(columnNumber, playerNumber) {
  if (!gameFinished && !isBoardFullyFilledIn()) {

    var row = lastFreeRowPerColumn[columnNumber];
    board[row][columnNumber] = playerNumber;

    if (rulesChecker.playerCanWin(board, row, columnNumber, playerNumber)) {
      winner = playerNumber;
      gameFinished = true;
    }

    --lastFreeRowPerColumn[columnNumber];

    // prints the board, used for debugging
    var str = ""
    for(var i = 0; i < NUMBER_OF_ROWS; ++i){
      for(var j=0; j < NUMBER_OF_COLUMNS; ++j){
        str += board[i][j]+ " "
      }
      str += "\n";
    }
    console.log(str)

  }
}

function isBoardFullyFilledIn() {
  for (var i = 0; i < lastFreeRowPerColumn.length; ++i) {
    if (lastFreeRowPerColumn[i] != 0) {
      return false;
    }
  }
  return true;
}


function initGame(){

  board = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
  ];

  gameFinished = false;

  lastFreeRowPerColumn = [
    NUMBER_OF_ROWS-1,
    NUMBER_OF_ROWS-1,
    NUMBER_OF_ROWS-1,
    NUMBER_OF_ROWS-1,
    NUMBER_OF_ROWS-1,
    NUMBER_OF_ROWS-1,
    NUMBER_OF_ROWS-1]

  winner = -1;

  playerNumber = 1;
}

},{"./rules_checker.js":3}],3:[function(require,module,exports){
exports.playerCanWin=playerCanWin;
exports.rowHasAConnection=rowHasAConnection;
exports.columnHasAConnection = columnHasAConnection;
exports.diagonalHasAConnection = diagonalHasAConnection;

var NUMBER_OF_CONNECTIONS_TO_WIN = 4;

function playerCanWin(board, row, column, playerNumber) {

  if (columnHasAConnection(board, column, playerNumber)
    || rowHasAConnection(board, row, playerNumber)
    || diagonalHasAConnection(board, row, column, playerNumber)) {
    return true;
  }

  return false;
}

function columnHasAConnection(board, column, playerNumber) {
  var consecutiveCells = 0;

  for (var row = 0; row < board.length; ++row) {

    if (board[row][column] == playerNumber) {
      if (++consecutiveCells == NUMBER_OF_CONNECTIONS_TO_WIN) {
        return true;
      }
    } else {
      consecutiveCells = 0;
    }
  }
  return false;
}

function rowHasAConnection(board, row, playerNumber) {
  var consecutiveCells = 0;

  for (var column = 0; column < board[0].length; ++column) {

    if (board[row][column] == playerNumber) {
      if (++consecutiveCells == NUMBER_OF_CONNECTIONS_TO_WIN) {
        return true;
      }
    } else {
      consecutiveCells = 0;
    }
  }
  return false;
}

function diagonalHasAConnection(board, row, column, playerNumber) {
  if (!positiveDiagonalHasAConnection(board, row, column, playerNumber)) {
    return negativeDiagonalHasAConnection(board, row, column, playerNumber);
  }
  return true;
}

function positiveDiagonalHasAConnection(board, row, column, playerNumber) {
  var initialRow = row;
  var initialColumn = column;

  while (initialRow > 0 && initialColumn > 0) {
    initialRow--;
    initialColumn--;
  }

  var consecutiveCells = 0;

  for (var i = initialRow, j = initialColumn; i < board.length && j < board[0].length; ++i, ++j) {
    if (board[i][j] == playerNumber) {
      if (++consecutiveCells == NUMBER_OF_CONNECTIONS_TO_WIN) {
        return true;
      }
    } else {
      consecutiveCells = 0;
    }
  }

  return false;
}

function negativeDiagonalHasAConnection(board, row, column, playerNumber) {

  var initialRow = row;
  var initialColumn = column;

  while (initialRow > 0 && initialColumn < (board[0].length - 1)) {
    initialRow--;
    initialColumn++;
  }

  var consecutiveCells = 0;

  for (var i = initialRow, j = initialColumn; i < board.length && j >= 0; ++i, --j) {
    if (board[i][j] == playerNumber) {
      if (++consecutiveCells == NUMBER_OF_CONNECTIONS_TO_WIN) {
        return true;
      }
    } else {
      consecutiveCells = 0;
    }
  }

  return false;
}

},{}]},{},[1]);
