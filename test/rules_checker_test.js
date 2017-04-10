var rulesChecker = require("../js/rules_checker.js");
var assert = require('assert');

describe('rules_checker', function() {

    before(function() {
        // runs before all tests in this block
        matrix = [
            [0, 0, 0, 0, 1, 0, 0],
            [2, 2, 1, 1, 2, 0, 0],
            [2, 2, 1, 1, 1, 0, 0],
            [2, 1, 2, 2, 1, 0, 0],
            [1, 2, 2, 2, 1, 0, 0],
            [2, 2, 2, 2, 1, 0, 0 ]
        ];
    });

    after(function() {
        // runs after all tests in this block
    });

    beforeEach(function() {
        // runs before each test in this block
    });

    afterEach(function() {
        // runs after each test in this block
    });

    describe('#columnHasAConnection', function() {
        it('should return true when there is a connection', function() {
            assert(rulesChecker.columnHasAConnection(matrix, matrix[0].length - 3, 1));
        });
        it('should return false when there is no connection', function() {
            for (j = 0; j < matrix[0].length - 3; ++j) {
                assert(false === rulesChecker.columnHasAConnection(matrix, j, 1));
            }

            for (j = 0; j < matrix[0].length - 3; ++j) {
                assert(false === rulesChecker.columnHasAConnection(matrix, j, 2));
            }
        });
    });

    describe('#rowHasAConnection', function() {
        it('should return true when there is a connection', function() {
            assert(rulesChecker.rowHasAConnection(matrix, matrix.length - 1, 2));
        });
        it('should return false when there is no connection', function() {
            for (i = 0; i < matrix.length; ++i) {
                assert(false === rulesChecker.rowHasAConnection(matrix, i, 1));
            }
            for (i = 0; i < matrix.length - 1; ++i) {
                assert(false === rulesChecker.rowHasAConnection(matrix, i, 2));
            }
        });
    });

    describe('#diagonalHasAConnection', function() {
        it('should return true when there is a connection', function() {
            assert(rulesChecker.diagonalHasAConnection(matrix, 1, 0, 2));
            assert(rulesChecker.diagonalHasAConnection(matrix, 0, 4, 1));
        });
        it('should return false when there is no connection', function() {
            for (i = 0; i < matrix.length - 1; ++i) {
                assert(false === rulesChecker.diagonalHasAConnection(matrix, 0, i, 2));
            }
        });
    });

    describe('#playerCanWin', function() {
        it('should return true when there is a connection', function() {
            assert(rulesChecker.playerCanWin(matrix, 1, 0, 2));
            assert(rulesChecker.playerCanWin(matrix, 0, 4, 1));
        });

        it('should return false when there is no connection', function() {
            for (i = 0; i < matrix.length; ++i) {
                assert(false === rulesChecker.playerCanWin(matrix, i, 1));
            }
            for (j = 0; j < matrix[0].length; ++j) {
                assert(false === rulesChecker.columnHasAConnection(matrix, j, 2));
            }
        });
    });
});
