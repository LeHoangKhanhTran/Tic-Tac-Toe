/*Check for winner*/
const number = 3;
export function getOtherPlayerMark(mark)
{
    if (mark === "X") return "O"
    else return "X"
}

export function getEmpty(grid)
{
    let temp = grid.slice();
    const emptyBlocks = [];
    for (let i = 0; i < temp.length; i++)
    {
      for (let j = 0; j < temp[i].length; j++)
      {
        if(!temp[i][j]) {
          emptyBlocks.push([i, j]);
        }
      }
    }
    return emptyBlocks;
}

  export function getWinnerAndWinRow(buttons)
  {
    for (let row = 0; row < buttons.length; row++)
    {
      for (let col = 0; col < buttons[row].length; col++)
      {
        if (buttons[row][col] && (buttons.length - row >= number || buttons[row].length - col >= number))
        {
          const winRow = getWinRowForCurrentSquare(row, col, buttons);
          if (winRow) 
          {
            return [buttons[row][col], winRow];
          }
        }
      }
    }
    return null;
  }

  function getWinRowForCurrentSquare(currentRow, currentCol, buttons)
  {
    const coors = [[0, 1], [1, 0], [1, 1], [1, -1]];
    for (let i = 0; i < coors.length; i++)
    {
      let currentPos = [currentRow, currentCol];
      const winRow = getWinRowForCurrentRoute(coors[i], currentPos, buttons);
      if (winRow) return winRow;
    }
    return null;
  }

  function getWinRowForCurrentRoute(route, currentPos, buttons)
  {
    let [currentRow, currentCol] = [currentPos[0], currentPos[1]]
    let squares = [[currentRow, currentCol]]; 
    let count = 1;
    let [r, c] = [currentRow + count * route[0], currentCol + count * route[1]];
    let currentSquare = [r, c];
    const currentPlayer = buttons[currentRow][currentCol];
    while (isValidSquareForWinCheck(currentSquare, currentPlayer, buttons) && count < number)
    {
      squares.push([r, c]);
      count++; 
      r = currentRow + count * route[0];
      c = currentCol + count * route[1];
      currentSquare = [r, c];
    }
    if (count >= number)
    {
      return squares;
    }
    return null;
  }

  function isValidSquareForWinCheck(currentSquare, currentPlayer, buttons)
  {
    const [row, col] = [currentSquare[0], currentSquare[1]];
    return (row >= 0 && row < buttons.length) && (col >= 0 && col < buttons.length) && buttons[row][col] === currentPlayer;
  }

  export function randomAutoPlay(buttons, playerMark, makeMove) {
    const blocks = getEmpty(buttons);
    if (blocks.length > 0)
    {
      let i = Math.floor(Math.random() * blocks.length);
      makeMove(blocks[i][0], blocks[i][1], getOtherPlayerMark(playerMark));
    }
  }

  export function smartAutoPlay(currentPlayer, playerMark, state, makeMove) 
  {
    const emptyBlocks = getEmpty(state);
    if (emptyBlocks.length === (state.length * state[0].length))
    {
      randomAutoPlay(state, playerMark, makeMove);
    }
    else 
    {
      const bestPos = Minimax(currentPlayer, playerMark, state).pos;
      makeMove(bestPos[0], bestPos[1], getOtherPlayerMark(playerMark));
    }
  }

  function Minimax(currentPlayer, playerMark, state)
  {
    let emptyBlocks = getEmpty(state);
    let winner = getWinnerAndWinRow(state);
    if (winner) 
    {
      if (winner[0] === playerMark) return {pos: null, score: -100};
      else if (winner[0] === getOtherPlayerMark(playerMark)) return {pos: null, score : 100};
    }
    else if (emptyBlocks.length === 0) return {pos: null, score: 0};
    let moves = []
    emptyBlocks.forEach(block => {
      let move = {};
      state[block[0]][block[1]] = currentPlayer;
      if (currentPlayer === playerMark)
      {
        let result = Minimax(getOtherPlayerMark(playerMark), playerMark, state);
        move = result;
      }
      else 
      {
        let result = Minimax(playerMark, playerMark, state);
        move = result;
      }
      move.pos = [block[0], block[1]];
      state[block[0]][block[1]] = "";
      moves.push(move);
    })
    let optimalMove;
    let optimalScore;
    if (currentPlayer === playerMark)
    {
      optimalScore = 10000;
      moves.forEach(move => {
        if (move.score < optimalScore)
        {
          optimalMove = move.pos;
          optimalScore = move.score;
        }
      }) 
    }
    else 
    {
      optimalScore = -10000;
      moves.forEach(move => {
        if (move.score > optimalScore)
        {
          optimalMove = move.pos;
          optimalScore = move.score;
        }
      })
    }
    return {pos: optimalMove, score: optimalScore};
  }

  /*Update records and local storage*/
  export function getRecordName(winner, gameMode, playerMark)
  {
    const winnerName = getWinnerName(winner, playerMark, gameMode);
    if (winnerName)
    {
      const recordName = `${gameMode}-${winnerName}-win`;
      return recordName;
    }
  }

  function getWinnerName(winner, playerMark, gameMode)
  {
    if (!winner) return null;
    if (winner === playerMark) return "player";
    else 
    {
      if (gameMode === "CPU") return gameMode;
      else return "opponent";
    }
  }

  export function setLocalStorage(recordName)
  {
    const record = JSON.parse(localStorage.getItem(recordName));
    localStorage.setItem(recordName, record + 1);
  }

  export function getLocalStorage(firstPlayer, secondPlayer)
  {
    const playerOneRecord = JSON.parse(localStorage.getItem(firstPlayer));
    const playerTwoRecord = JSON.parse(localStorage.getItem(secondPlayer));
    return {pWin: playerOneRecord, oppWin: playerTwoRecord }
  }

  
  
