import React, { Component, useRef } from "react";
import {useEffect}   from "react";
import Button from "../Button/Button";
import "./Board.css";
import WinState from '../WinState/WinState';
import { getWinnerAndWinRow, randomAutoPlay, smartAutoPlay} from "../../helpers";

export default function Board({display, updateWin, updateTie, reset, playerMark, mode, currentTurn, prevWinner, winner, switchMark})
{
  function updateWinStates(w, winRow)
  {
    setSquares(prev => winRow);
    updateWin(w);
  }
  
  useEffect(() => {
    const delayDuration = [1000, 1500, 1800, 2000];
    if (currentTurn !== playerMark) {
      const duration = delayDuration[Math.floor(Math.random() * delayDuration.length)];
      if (mode === "CPU")
      {
        setTimeout(() => {
          smartAutoPlay(currentTurn, playerMark, buttons, makeMoveAndUpdateWinStates);
        }, duration);
      }
      else 
      {
        setTimeout(() => {
          randomAutoPlay(buttons, playerMark, makeMoveAndUpdateWinStates);
        }, duration);
      }
    }
  }, [currentTurn]);

  function handleClick(row, column) {
    if(!buttons[row][column])
    {
      makeMoveAndUpdateWinStates(row, column, playerMark); 
    }
  }

  function makeMoveAndUpdateWinStates(row, column, player)
  {
    let winner = getWinnerAndWinRow(buttons);
    if (!winner && !buttons[row][column])
    {
      const elements = buttons.slice();
      elements[row][column] = player;
      setButtons((prev) => elements);
      setCount(prev => prev + 1);
      winner = getWinnerAndWinRow(buttons);
      if (winner)
      {
        updateWinStates(winner[0], winner[1]);
      }
    }
  }

  const arr = [];
  for (let i = 0; i < 6; i++)
  {
    arr.push(Array(5));
  }
  const [buttons, setButtons] = React.useState(arr);
  const [count, setCount] = React.useState(0);
  const [squares, setSquares] = React.useState([]);

  useEffect(() => {
    if (!winner && count !== buttons.length * buttons[0].length && count > 0)
    {
      display(); 
    }
    if (count === buttons.length * buttons[0].length && winner === "")
    { 
      updateTie();
    }    
  }, [buttons])
  const buttonElements = buttons.map((b, r) => 
    [...b].map((_, c) => {
      console.log('A')
      return <Button row={r} column={c} value={buttons[r][c]} onClick={handleClick} winner={winner} winSquares={squares} disabled={currentTurn !== playerMark ? true : false}></Button>
    })
  )
  
  return (
    <div className="board">{buttonElements} 
     {(winner || count === buttons.length * buttons[0].length) && <WinState winner={winner} prevWinner={prevWinner} reset={reset} mode={mode} playerMark={playerMark} switchMark={switchMark}></WinState>};
    </div>
  );
}