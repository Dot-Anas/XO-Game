const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let cells = Array(9).fill("");
let gameActive = true;

function createBoard() {
  board.innerHTML = "";
  cells.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.className =
      "w-24 h-24 bg-white shadow flex items-center justify-center text-3xl font-bold cursor-pointer hover:bg-gray-200";
    cell.addEventListener("click", () => handleClick(cell, index));
    board.appendChild(cell);
  });
}

function handleClick(cell, index) {
  if (!gameActive || cells[index] !== "") return;

  cells[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!cells.includes("")) {
    statusText.textContent = "Oops restart the game!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer} turn`;
}

function checkWinner() {
  const patterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return patterns.some(([a,b,c]) =>
    cells[a] && cells[a] === cells[b] && cells[a] === cells[c]
  );
}

function resetGame() {
  currentPlayer = "X";
  cells = Array(9).fill("");
  gameActive = true;
  statusText.textContent = "Player X turn";
  createBoard();
}

restartBtn.addEventListener("click", resetGame);

createBoard();
