const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const message = document.getElementById('message');

let currentPlayer = 'X'; // X starts the game
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Empty game board

// Check for a winner
const checkWinner = () => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }
  return null;
};

// Handle cell click
const handleCellClick = (index) => {
  if (gameBoard[index] === '') {
    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
      message.textContent = `${winner} Wins!`;
      board.removeEventListener('click', handleClick);
    } else if (!gameBoard.includes('')) {
      message.textContent = 'It\'s a Draw!';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
};

// Reset game
const resetGame = () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = '');
  message.textContent = '';
  currentPlayer = 'X';
  board.addEventListener('click', handleClick);
};

// Set up click event listener
const handleClick = (event) => {
  const cell = event.target;
  const index = Array.from(cells).indexOf(cell);
  handleCellClick(index);
};

// Add event listener for the board
board.addEventListener('click', handleClick);

// Add event listener for the reset button
resetButton.addEventListener('click', resetGame);
