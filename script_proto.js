// Gameboard Module - Handle win condition, board reset, and space marking
const Gameboard = (() => {
    // establish playable spaces
    const playableSpaces = ['','','','','','','','',''];

    const createBoard = () => "";
        // pass above variable to this function instead of ""

    const markSpace = (index,mark) => {
        // if clicked space === ""
            // replace "" with player.mark
            // return true
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
        // if a win condition is detected
            // detect which player triggered winning combo
            // return winning combo, player, 

        // when checkRemainingSpaces returns false, run
        if (checkRemainingSpaces()) {
            return // set winner as a tie, return combo of null
        }
        return null;
    }
    return {createBoard,markSpace,resetGameboard,checkRemainingSpaces,checkForWinner}
})();

// player object factory
const Player= (name,mark) => {
    return {name,mark};
    // add wins:0, losses:0, ties
};

// game controller module
const GameController = (() => {
    let players = [];
    let playerIndex = 0;
    let isGameRunning = false;

    const initPlayer = (xPlayer,oPlayer) => {
        players = [
            Player(xPlayer,'x'),
            Player(oPlayer,'o')
        ];
        playerIndex = 0;
    };
    const getCurrentPlayer = () => players[playerIndex];
    const swapPlayer = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
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
    // create selectors for all needed html elements
        // use ID's for most everything
        // queryselectorall for the gameboard spaces
    
    const gameStartup = () => {
        // selector for the div containing input form 
            // variable.style.display = 'block/flex'
        // selector for the div containing gameboard
            // variable.style.display = 'none
    };
    const showGameboard = () => {
        // selector for the div containing gameboard 
            // variable.style.display = 'block/flex'
        // selector for the div containing input form
            // variable.style.display = 'none
    };
    const spaceTaken = () => {
        const board = Gameboard.createBoard();
        // selector for all gameboard spaces
            // variable.forEach(space,index) => {}
                // update text content for the space with player.mark
                // if space isn't ''
                    // add class to selected space denoting it is taken
                    // add class (board[index].toLowerCase()
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