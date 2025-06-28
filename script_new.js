// Create Players
const Player= (name,mark) => {
    return {name,mark};
}
// Gameboard module - Handle marks, win conditions, and resets
const Gameboard = (() => {
    let playableSpaces = ['','','','','','','','','',];

    const getBoard =  () => playableSpaces;

    const markSpace = (index,mark) => {
        // decide if move is valid
        if (playableSpaces[index] === "") {
            playableSpaces[index] = mark;
            return true;
        }
        return false;
    };
    const resetBoard = () => {
        // empty board
        playableSpaces = ['','','','','','','','','',];
    };
    const isBoardFull = () => {
        // check for remaining spaces
        return playableSpaces.every(space => space !== "");
    }
    const getWinner = () => {
        // check for winning combination, declare winner
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
        // when win condition is detected, return player
        for (let condition of winConditions) {
            const [a,b,c] = condition;
            if (playableSpaces[a] && playableSpaces[a] === playableSpaces[b] && playableSpaces[a] === playableSpaces[c]) {
                return { winner: playableSpaces[a], combination};
            }
        }
        // if gameboard is full, trigger a tie
        if (isBoardFull()) {
            return {winner: 'tie', combination:null}
        }
        return null;
    }
    return {getBoard,markSpace,resetBoard,getWinner,isBoardFull};
})();

// control main game functions
const GameControls = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let gameStarted = false;

    const initPlayers = (xPlayerName,oPlayerName) => {
        players = [
            Player(xPlayerName,'X'),
            Player(oPlayerName,'O')
        ];
        currentPlayerIndex = 0;
    };
    const getCurrentPlayer = () => players[currentPlayerIndex];
    // after valid move is made, swap to opposing player
    const swapPlayer = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1:0;
    };
    // begin game when player form is completed
    const startGame = () => {
        gameStarted = true;
        Gameboard.resetBoard();
        currentPlayerIndex=0;
    };
    // mark selected space and swap to opposing player
    const makeMove = (index) => {
        if (!gameStarted) return false;
        const currentPlayer = getCurrentPlayer();
        const moveIsValid = Gameboard.markSpace(index, currentPlayer.mark);
        if (moveIsValid) {
            const result = Gameboard.getWinner();
            if (result) {
                gameStarted = false;
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
                    gameOver:false,
                    currentPlayer:getCurrentPlayer()
                };
            }
        }
        return {success:false};
    }
    // pass current boolean value of gameStarted
    const isGameActive = () => gameStarted;
    // reset game board, player turn, and gameStarted variable
    const resetGame = () => {
        gameStarted=false;
        Gameboard.resetBoard();
        currentPlayerIndex=0;
    };
    return {
        initPlayers,
        getCurrentPlayer,
        startGame,
        makeMove,
        isGameActive,
        resetGame
    };
})();

// update display
const DisplayControls = (() => {
    // page feature selectors
    const setupForm = document.getElementById('setup-form');
    const gameContainer = document.getElementById('game-container');
    const gameboard = document.getElementById('game-board');
    const currentPlayerDisplay = document.getElementById('current-player');
    const gameResult = document.getElementById('game-results');
    // button selectors
    const startGameButton = document.getElementById('start-button');
    const restartGameButton = document.getElementById('restart-game');
    // input selectors
    const xPlayerInput = document.getElementById('x-player');
    const oPlayerInput = document.getElementById('o-player');
    // game space selector
    const spaces = document.querySelectorAll('.space');

    // hide game board, show input form
    const showSetup = () => {
        setupForm.style.display = 'block';
        gameContainer.style.display = 'none';
    }
    // hide input form, show game board
    const showGame = () => {
        setupForm.style.display = 'none';
        gameContainer.style.display = 'block';
    }
    // add class to filled spaces
    const updateDisplay = () => {
        const board = Gameboard.getBoard();
        spaces.forEach((space,index) => {
            space.textContent = board[index];
            space.className='space';
            if (board[index] !== '') {
                space.classList.add('taken');
                space.classList.add(board[index].toLowerCase());
            }
        });
    };
    // show current player
    const updateCurrentPlayer = (player) => {
        currentPlayerDisplay.textContent = `${player.name}'s turn (${player.mark})`;
    };
    const showResults = (result, currentPlayer) => {
        gameResult.style.display = 'block';

        if (result.winner === 'tie') {
            gameResult.textContent = "It's a tie! Play again?";
            gameResult.className = 'game-result tie';
        } else {
            const winnerName = result.winner === currentPlayer.mark ? currentPlayer.name : (currentPlayer.name === xPlayerInput.value ? oPlayerInput.value : xPlayerInput.value);
            
            gameResult.textContent = `${winnerName} wins this round!`;
            gameResult.className = 'game-result winner';

            // highlight winning moves
            if (result.combination) {
                result.combination.forEach(index => {
                    spaces.index.classList.add('winning-space');
                });
            }
        }
        currentPlayerDisplay.textContent = 'Game Over, restart to try again!';
    };
    const clearGameboard = () => {
        gameResult.style.display='none';
        gameResult.textContent = '';
        gameResult.className = 'game-result';

        // clear highlighted spaces
        spaces.forEach(space => {
            space.classList.remove('winning-space');
        });
    };
    const handleSpaceClick = (event) => {
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
    };
    const triggerStartGame = () => {
        const xPlayer = xPlayerInput.value.trim();
        const oPlayer = oPlayerInput.value.trim();

        GameControls.initPlayers(xPlayer,oPlayer);
        GameControls.startGame();

        showGame();
        updateDisplay();
        updateCurrentPlayer(GameControls.getCurrentPlayer());
        clearGameboard();
    };
    const triggerGameRestart = () => {
        GameControls.resetGame();
        showSetup();
        clearGameboard();
    };
    //Event listeners
    startGameButton.addEventListener('click', triggerStartGame);
    restartGameButton.addEventListener('click', triggerGameRestart);
    spaces.forEach(space => {
        space.addEventListener('click', handleSpaceClick);
    })
    showSetup();
    return {
        updateDisplay,
        updateCurrentPlayer,
        showResults,
        clearGameboard
    }
})();