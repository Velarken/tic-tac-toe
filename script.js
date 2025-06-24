
const Gameboard = {
    // Flip 0 to 1 when space is occuped by 'X'
    // Flip 0 to 2 when space is occupied by 'O'
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
        if (Gameboard.gameboard[spaceToCheck] !== 0) {
            alert('invalid move, try an empty square!');
        } else if (Gameboard.gameboard[spaceToCheck] === 0) {
            this.makeMove(spaceToCheck,team)
        }
    },
    makeMove: function(chosenSpace, team) {
        // Clean input string before logging
        const lowerTeam=team.toLowerCase();
        Gameboard.gameboard[chosenSpace]=lowerTeam;
        this.checkXWin();
        this.checkOWin();
    },
    checkXWin: function() {
        console.log('checkXWin function running!')
        // Horizontal Wins
        if (Gameboard.gameboard[0]==='x' && Gameboard.gameboard[1]==='x' && Gameboard.gameboard[2]==='x') {
            console.log('X wins!');
            Gameboard.resetBoard();
        } else if (Gameboard.gameboard[3]==='x' && Gameboard.gameboard[4]==='x' && Gameboard.gameboard[5]==='x') {
            console.log('X wins!');
            Gameboard.resetBoard();
        } else if (Gameboard.gameboard[6]==='x' && Gameboard.gameboard[7]==='x' && Gameboard.gameboard[8]==='x') {
            console.log('X wins!');
            Gameboard.resetBoard();
        }
        // Vertical Wins
        if (Gameboard.gameboard[0]==='x' && Gameboard.gameboard[3]==='x' && Gameboard.gameboard[6]==='x') {
            console.log('X wins');
            Gameboard.resetBoard();
        } else if (Gameboard.gameboard[3]==='x' && Gameboard.gameboard[4]==='x' && Gameboard.gameboard[5]==='x') {
            console.log('X wins!');
            Gameboard.resetBoard();
        } else if (Gameboard.gameboard[6]==='x' && Gameboard.gameboard[7]==='x' && Gameboard.gameboard[8]==='x') {
            console.log('X wins!');
            Gameboard.resetBoard();
        }
        // Diagonal Wins
        if(Gameboard.gameboard[0]==='x' && Gameboard.gameboard[4]==='x' && Gameboard.gameboard[8]==='x') {
            console.log('X wins!');
            Gameboard.resetBoard();
        } else if (Gameboard.gameboard[2]==='x' && Gameboard.gameboard[4]==='x' && Gameboard.gameboard[6]==='x') {
            console.log('X wins!');
            Gameboard.resetBoard();
        }
    },
    checkOWin: function() {
        console.log('checkOWin function running!')
        // Horizontal Wins
        if (Gameboard.gameboard[0]==='o' && Gameboard.gameboard[1]==='o' && Gameboard.gameboard[2]==='o') {
            console.log('O wins!');
            Gameboard.resetBoard();
        } else if (Gameboard.gameboard[3]==='o' && Gameboard.gameboard[4]==='o' && Gameboard.gameboard[5]==='o') {
            console.log('O wins!');
            Gameboard.resetBoard();
        } else if (Gameboard.gameboard[6]==='o' && Gameboard.gameboard[7]==='o' && Gameboard.gameboard[8]==='o') {
            console.log('O wins!');
            Gameboard.resetBoard();
        }
        // Vertical Wins
        if (Gameboard.gameboard[0]==='o' && Gameboard.gameboard[3]==='o' && Gameboard.gameboard[6]==='o') {
            console.log('O wins');
            Gameboard.resetBoard();
        } else if (Gameboard.gameboard[3]==='o' && Gameboard.gameboard[4]==='o' && Gameboard.gameboard[5]==='o') {
            console.log('O wins!');
            Gameboard.resetBoard();
        } else if (Gameboard.gameboard[6]==='o' && Gameboard.gameboard[7]==='o' && Gameboard.gameboard[8]==='o') {
            console.log('O wins!');
            Gameboard.resetBoard();
        }
        // Diagonal Wins
        if(Gameboard.gameboard[0]==='o' && Gameboard.gameboard[4]==='o' && Gameboard.gameboard[8]==='o') {
            console.log('O wins!');
            Gameboard.resetBoard();
        } else if (Gameboard.gameboard[2]==='o' && Gameboard.gameboard[4]==='o' && Gameboard.gameboard[6]==='o') {
            console.log('X wins!');
            Gameboard.resetBoard();
        }
    }
};

const Player = {
    name: '',
    wins:0,
    losses:0,
    gamesPlayed:0
};