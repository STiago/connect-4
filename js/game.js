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
