import React from "react";
import Header from "../Header/Header";
import Board from "../Board/Board";
import Footer from "../Footer/Footer";
import { useMemo, useEffect } from "react";

export default function Game({gameMode, playerMark, switchMark}) {
  const [turn, setTurn] = React.useState("X");
  const [state, setState] = React.useState(0);
  const [xWin, setX] = React.useState(0);
  const [oWin, setO] = React.useState(0);
  const [tie, setTie] = React.useState(0);
  const [winner, setWinner] = React.useState("");
  const prevWinner = useMemo(() => {
    if (winner)  return winner;
    else return "X";
  }, [xWin, oWin]);

  useEffect(() => {
    updateWinRecords();
  }, [winner])

  function updateWinRecords() 
  {
    const recordName = getRecordName();
    setWinRecord(recordName);
    if (gameMode === "CPU") 
    {
      getWinRecords("CPU-player-win", "CPU-CPU-win");
    }
    else 
    {
      getWinRecords("Player-player-win", "Player-opponent-win");
    }
  }

  function getRecordName()
  {
    const winnerName = getWinnerName();
    if (winnerName)
    {
      const recordName = `${gameMode}-${winnerName}-win`;
      return recordName;
    }
  }

  function getWinnerName()
  {
    if (!winner) return null;
    if (winner === playerMark) return "player";
    else 
    {
      if (gameMode === "CPU") return gameMode;
      else return "opponent";
    }
  }

  function setWinRecord(recordName)
  {
    const record = JSON.parse(localStorage.getItem(recordName));
    localStorage.setItem(recordName, record + 1);
  }

  function getWinRecords(firstPlayer, secondPlayer)
  {
    const playerOneRecord = JSON.parse(localStorage.getItem(firstPlayer));
    const playerTwoRecord = JSON.parse(localStorage.getItem(secondPlayer));
    showRecords(playerOneRecord, playerTwoRecord);
  }

  function showRecords(pWin, oppWin)
  {
    if (playerMark === "X")
    {
      pWin ? setX(pWin) : setX(0);
      oppWin ? setO(oppWin) : setO(0);
    }
    else 
    {
      pWin ? setO(pWin) : setO(0);
      oppWin ? setX(oppWin) : setX(0);
    }
    const Tie = JSON.parse(localStorage.getItem(`${gameMode}-tie`));
    setTie(Tie ? Tie : 0);
  }

  function changeTurn()
  {
    setTurn((prev) => prev === "X" ? "O" : "X")
  }

  function setVictory(winner)
  {  
    if (winner === "X")
    {
      setX((prev) => prev + 1);
    }
    else if (winner === "O")
    {
      setO((prev) => prev + 1);
    }
    setWinner(prev => winner);
  }

  function Tie()
  {
   setTurn(prev => prev = prevWinner);
   const Tie = JSON.parse(localStorage.getItem(`${gameMode}-tie`));
   localStorage.setItem(`${gameMode}-tie`, Tie + 1);
   const newTie = JSON.parse(localStorage.getItem(`${gameMode}-tie`));
   setTie(newTie);
  }

  function reset()
  {
    setState((prev) => prev + 1);
    setTurn(prev => prevWinner ? prevWinner : "X");
    setWinner(prev => "");
  }
 
  return (
    <div className="app">
      <div className="container">
        <Header click={reset} currentTurn={turn}></Header>
        <Board key={state} display={changeTurn} updateWin={setVictory} updateTie={Tie} reset={reset} playerMark={playerMark} mode={gameMode}
        currentTurn={turn} prevWinner={prevWinner} winner={winner} switchMark={switchMark}></Board>
        <Footer x={xWin} o={oWin} t={tie} playerMark={playerMark} mode={gameMode}></Footer>
      </div>
    </div>
  )
}