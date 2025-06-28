const clickedSpace = document.querySelectorAll('.space');
for (space of clickedSpace) {
    space.addEventListener('click',(clicked) => getID(clicked));
}
const markX = document.getElementById('x-mark');
const markO = document.getElementById('o-mark');
const teamX = document.getElementById('teamX');
teamX.addEventListener('click', () => createTeamXPlayer());
markX.addEventListener('click', (clicked) => turnRed(clicked));
const resetGame = document.getElementById('reset-game');
resetGame.addEventListener('click', () => Gameboard.resetBoard());
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
        //this.bindEvents();
        //this.render();
    },
    cacheDom: function() {
        // Cache html elements on page and their relation to each other
        // to avoid multiple DOM searches
        this.space = document.querySelector('.space');
        this.spaceID = this.space.id;
        console.log(this.spaceID);
    },
    bindEvents: function() {
        this.spaceID.addEventListener('click', Game.validMove(this.spaceID, 'x'));
    },
    render: function() {
        // WIP
    },
    resetBoard: function() {
        this.gameboard = [0,0,0,0,0,0,0,0,0];
        this.space.style.backgroundColor = 'black';
    },
};
Gameboard.init()
const Game = {
    validMove:function(spaceToCheck,team) {
        console.log('you are here')
        if (Gameboard.gameboard[spaceToCheck] === 2) {
            alert('occupied by O, try an empty square!');
        } else if (Gameboard.gameboard[spaceToCheck] === 1) {
            alert('occupied by X, try an empty square!')
        } else if (Gameboard.gameboard[spaceToCheck] === 0) {
            this.makeMove(spaceToCheck,team)
        }
        // maybe add a section that counts how many remaining valid moves exist
            // find number of 0's in Gameboard.gameboard, if that number === 0,
            // prompt players the game is a draw, offer to reset gameboard
            // didPlayersDraw();
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
function getID(clicked) {
    const clickedID = clicked.target.id;
    let targeted = document.getElementById(clickedID);
    targeted.style.backgroundColor = 'red';
    if (targeted.style.backgroundColor = 'red') {
        turnGreen(targeted);
    } else if (targeted.style.backgroundColor = 'green') {
        turnRed(targeted);
    }
    
}
function turnGreen(targeted) {
    targeted.style.backgroundColor = 'green'
}
function turnRed(targeted) {
    targeted.style.backgroundColor = 'red';
}
function createTeamXPlayer() {
    xPlayer.name = window.prompt('What is your name?');
    alert(`Hello, ${xPlayer.name}, welcome to team X!`);
}