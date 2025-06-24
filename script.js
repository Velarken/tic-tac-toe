
const Gameboard = {
    // Flip 0 to 1 when space is occuped by 'X'
    // Flip 0 to 2 when space is occupied by 2
    gameboard: 
    [
        0,0,0,
        0,0,0,
        0,0,0
    ],
    init: function() {
        this.cacheDom();
        this.bindEvents();
        this.render();
    },
    cacheDom: function() {
        // Cache html elements on page and their relation to each other
        // to avoid multiple DOM searches
        this.space = document.querySelector('.space');
        this.spaceID = space.id;
    },
    bindEvents: function() {

    },
    render: function() {

    },
    resetBoard: function() {
        this.gameboard = [0,0,0,0,0,0,0,0,0];
    },
};
const Game = {
    validMove:function(spaceToCheck,team) {
        if (Gameboard.gameboard[spaceToCheck] === 2) {
            alert('occupied by O, try an empty square!');
        } else if (Gameboard.gameboard[spaceToCheck] === 1) {
            alert('occupied by X, try an empty square!')
        } else if (Gameboard.gameboard[spaceToCheck] === 0) {
            this.makeMove(spaceToCheck,team)
        }
    },
    makeMove: function(chosenSpace, team) {
        // Clean input string before logging
        const lowerTeam = team.toLowerCase();
        if (lowerTeam==='x') {
            Gameboard.gameboard[chosenSpace]=1;
        } else if (lowerTeam=== 'o') {
            Gameboard.gameboard[chosenSpace]=2;
        } else {
            alert('invalid input, try X or O');
        }
        // Check if move made ends the game
        this.checkForWin();
    },
    checkForWin: function() {
        this.didXWin();
        this.didOWin();
        this.didPlayersDraw();
    },
    didPlayersDraw: function() {
        console.log('checkDraw function running!')
    },
    didXWin: function() {
        console.log('checkXWin function running!')
        // Horizontal Wins
        if (Gameboard.gameboard[0]===1 && Gameboard.gameboard[1]===1 && Gameboard.gameboard[2]===1) {
            console.log('X wins!');
            Gameboard.resetBoard();
        } else if (Gameboard.gameboard[3]===1 && Gameboard.gameboard[4]===1 && Gameboard.gameboard[5]===1) {
            console.log('X wins!');
            Gameboard.resetBoard();
        } else if (Gameboard.gameboard[6]===1 && Gameboard.gameboard[7]===1 && Gameboard.gameboard[8]===1) {
            console.log('X wins!');
            Gameboard.resetBoard();
        }
        // Vertical Wins
        if (Gameboard.gameboard[0]===1 && Gameboard.gameboard[3]===1 && Gameboard.gameboard[6]===1) {
            console.log('X wins');
            Gameboard.resetBoard();
        } else if (Gameboard.gameboard[3]===1 && Gameboard.gameboard[4]===1 && Gameboard.gameboard[5]===1) {
            console.log('X wins!');
            Gameboard.resetBoard();
        } else if (Gameboard.gameboard[6]===1 && Gameboard.gameboard[7]===1 && Gameboard.gameboard[8]===1) {
            console.log('X wins!');
            Gameboard.resetBoard();
        }
        // Diagonal Wins
        if(Gameboard.gameboard[0]===1 && Gameboard.gameboard[4]===1 && Gameboard.gameboard[8]===1) {
            console.log('X wins!');
            Gameboard.resetBoard();
        } else if (Gameboard.gameboard[2]===1 && Gameboard.gameboard[4]===1 && Gameboard.gameboard[6]===1) {
            console.log('X wins!');
            Gameboard.resetBoard();
        }
    },
    didOWin: function() {
        console.log('checkOWin function running!')
        // Horizontal Wins
        if (Gameboard.gameboard[0]===2 && Gameboard.gameboard[1]===2 && Gameboard.gameboard[2]===2) {
            console.log('O wins!');
            Gameboard.resetBoard();
        } else if (Gameboard.gameboard[3]===2 && Gameboard.gameboard[4]===2 && Gameboard.gameboard[5]===2) {
            console.log('O wins!');
            Gameboard.resetBoard();
        } else if (Gameboard.gameboard[6]===2 && Gameboard.gameboard[7]===2 && Gameboard.gameboard[8]===2) {
            console.log('O wins!');
            Gameboard.resetBoard();
        }
        // Vertical Wins
        if (Gameboard.gameboard[0]===2 && Gameboard.gameboard[3]===2 && Gameboard.gameboard[6]===2) {
            console.log('O wins');
            Gameboard.resetBoard();
        } else if (Gameboard.gameboard[3]===2 && Gameboard.gameboard[4]===2 && Gameboard.gameboard[5]===2) {
            console.log('O wins!');
            Gameboard.resetBoard();
        } else if (Gameboard.gameboard[6]===2 && Gameboard.gameboard[7]===2 && Gameboard.gameboard[8]===2) {
            console.log('O wins!');
            Gameboard.resetBoard();
        }
        // Diagonal Wins
        if(Gameboard.gameboard[0]===2 && Gameboard.gameboard[4]===2 && Gameboard.gameboard[8]===2) {
            console.log('O wins!');
            Gameboard.resetBoard();
        } else if (Gameboard.gameboard[2]===2 && Gameboard.gameboard[4]===2 && Gameboard.gameboard[6]===2) {
            console.log('X wins!');
            Gameboard.resetBoard();
        }
    }
};

const Player = {
    name: '', // take from player input
    team:1, // 1 for x, 2 for o
    wins:0, 
    losses:0,
    gamesPlayed:0
};