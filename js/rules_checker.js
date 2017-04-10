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
