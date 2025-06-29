// Gameboard Module - Handle win condition, board reset, and space marking
const Gameboard = (() => {
    // establish playable spaces
    let playableSpaces = ['','','','','','','','',''];

    const createBoard = () => playableSpaces;

    const markSpace = (index,mark) => {
        if (playableSpaces[index] === '') {
            playableSpaces[index] = mark;
            return true; // successfully marked space
        }
        return false; // failed to mark space
    };
    const resetGameboard = () => {
        // reset playableSpaces variable to default
        playableSpaces = ['','','','','','','','',''];
    };
    const checkRemainingSpaces = () =>{
        // return true if spaces remain, false if board is full
        return playableSpaces.every(space => space !== "");
    };
    const checkForWinner = () => {
        // check for winning combination against winCondition array
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
        // detect winning combo and assign win to player
        for (let condition of winConditions) {
            const [a,b,c] = condition;
            // test for all 'x' or 'o' in winning combo
            if (playableSpaces[a] && playableSpaces[a] === playableSpaces[b] && playableSpaces[a] === playableSpaces[c]) {
                return { winner: playableSpaces[a], combination};
            }
        }
        // trigger a tie if all spaces are full and no combo is triggered
        if (checkRemainingSpaces()) {
            return {winner:'tie', combination:null};
        }
        return null;
    }
    return {createBoard,markSpace,resetGameboard,checkRemainingSpaces,checkForWinner}
})();

// player object factory
const Player= (name,mark,wins,losses,ties) => {
    return {name,mark,wins,losses,ties};
};

// game controller module
const GameController = (() => {
    let players = [];
    let playerIndex = 0;
    let isGameRunning = false;

    const initPlayer = (xPlayer,oPlayer) => {
        players = [
            Player(xPlayer,'x',0,0,0),
            Player(oPlayer,'o',0,0,0)
        ];
        playerIndex = 0;
    };
    const getCurrentPlayer = () => players[playerIndex];
    const swapPlayer = () => {
        playerIndex = playerIndex === 0 ? 1 : 0;
    };
    const startGame = () => {
        // triggers on form completion, or form bypass
        isGameRunning = true;
        Gameboard.resetGameboard();
        currentPlayerIndex=0;
    };
    const makeMove = (index) => {
        // prevent moves when game is not running
        if (!isGameRunning) return false; 
        const currentPlayer = getCurrentPlayer();
        const isMoveValid = Gameboard.markSpace(index,currentPlayer.mark);
        
        if (isMoveValid) {
            const gameResult = Gameboard.checkForWinner();
            if (gameResult) {
                isGameRunning = false;
                return {
                    success:true,
                    gameOver:true,
                    result:result,
                    currentPlayer:currentPlayer
                };
            } else {
                swapPlayer();
                return {
                    success:true,
                    gameOVer:false,
                    currentPlayer:getCurrentPlayer()
                };
            }
        }
        return {success:false};
    }
    // check if game is running
    const isGameActive = () => isGameRunning;
    // reset game variables to default
    const resetGame = () => {
        isGameRunning = false;
        Gameboard.resetBoard();
        currentPlayerIndex = 0;
    };
    return {
        initPlayer,
        getCurrentPlayer,
        startGame,
        makeMove,
        isGameActive,
        resetGame
    };
})();

// display controller module
const DisplayController = (() => {
    // DOM selectors
    const setupForm = document.getElementById('setupForm');
    const gameContainer = document.getElementById('gameContainer');
    const gameBoard = document.getElementById('gameBoard');
    const turnDisplay = document.getElementById('turnDisplay');
    const gameResult = document.getElementById('gameResults');
    // buttons
    const startGameButton = document.getElementById('startButton');
    const restartGameButton = document.getElementById('restartButton');
    // player name selectors
    const xPlayerName = document.getElementById('xPlayerName');
    const oPlayerName = document.getElementById('oPlayerName');
    // gameboard space selector
    const spaces = document.querySelectorAll('.space');
    
    const gameStartup = () => {
        setupForm.style.display = 'flex';
        gameContainer.style.display = 'none';
    };
    const showGameboard = () => {
        setupForm.style.display = 'none';
        gameContainer.style.display = 'flex';
    };
    const spaceTaken = () => {
        // sets board equal to playableSpaces
        const board = Gameboard.createBoard(); 
        spaces.forEach((space,index) => {
            space.textContent = board[index]; // shows player.mark
            space.className = 'space';
            // if space is marked, apply player mark and 'taken' to class list
            if (board[index] !== '') {
                space.classList.add('taken');
                space.classList.add(board[index].toLowerCase())
            }
        });
    };
    const displayCurrentPlayer = (player) => {
        // display active team
        // selector for turn display
            // .textContent = `${player.name}'s turn (${player.mark})
    };
    const displayGameResult = (result,currentPlayer) => {
        // gameresult.style.display = 'block

        // if game is a tie
            // display to game result screen
            // add class to result display indicating a tie
                // use CSS to differ a tie from a win or loss
        // if game isn't a tie
            /* 
                const winnerName = result.winner === currentPlayer.mark ? currentPlayer.name : (currentPlayer.name === xPlayerInput.value ? oPlayerInput.value : xPlayerInput.value); 
            */
            // display to game result screen
                // winner name
                // number of rounds won and loss
                // number of ties
            // highlight winning combination 
        // show game over screen
        
    };
    const clearGameboard = () => {
        // clear highlighted spaces
        // remove added classes to all elements
    };
    const handleClicks = (event) => {
        // figure out whatever this is and make it work for you 

        /*
            const index = parseInt(event.target.dataset.index);
            const result = GameControls.makeMove(index);

            if (result.success) {
                updateDisplay();
                if (result.gameOver) {
                    showResults(result.result,result.currentPlayer);
                } else {
                    updateCurrentPlayer(result.currentPlayer);
                }
            }
        */
    };
    const triggerStartGame = () => {
        // create variables that represent the player name input in setup form
        // GameController.initPlayers(player1,player2);
        // GameController.startGame();

        // showGame()
        // spaceTaken()
        // updateCurrentPlayer(GameController.getCurrentPlayer())
        // clear gameboard
    };
    const triggerGameRestart = () => {
        GameController.resetGame();
        gameStartup();
        clearGameboard();
    };
    // add event listeners for buttons
    // add event listeners for each space
    gameStartup();
    return {
        // update display
        // update current player
        // show results
        // clear gameboard
    }
})();

// add a limit of 5 rounds before showing final results