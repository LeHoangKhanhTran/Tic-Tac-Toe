import React, { useContext } from "react";
import Header from "../Header/Header";
import Board from "../Board/Board";
import Footer from "../Footer/Footer";
import { useMemo, useEffect, useCallback } from "react";
import { getRecordName, setLocalStorage, getLocalStorage } from "../../helpers";
import { GameModeContext, PlayerMarkContext } from "../../App";
export default function Game() {
  const [turn, setTurn] = React.useState("X");
  const [state, setState] = React.useState(0);
  const [xWin, setX] = React.useState(0);
  const [oWin, setO] = React.useState(0);
  const [tie, setTie] = React.useState(0);
  const [winner, setWinner] = React.useState("");
  const gameMode = useContext(GameModeContext);
  const playerMark = useContext(PlayerMarkContext);

  const prevWinner = useMemo(() => {
    if (winner)  return winner;
    else return "X";
  }, [xWin, oWin]);

  useEffect(() => {
    updateRecords();
  }, [winner])

  const updateRecords = useCallback(() => {
    const recordName = getRecordName(winner, gameMode, playerMark);
    setLocalStorage(recordName);
    if (gameMode === "CPU") 
    {
      showRecords("CPU-player-win", "CPU-CPU-win");
    }
    else 
    {
      showRecords("Player-player-win", "Player-opponent-win");
    }
  }, [winner])

  const showRecords = useCallback((firstPlayer, secondPlayer) => {
    const { pWin, oppWin } = getLocalStorage(firstPlayer, secondPlayer)
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
  }, [winner])

  function setVictory(winner) {  
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

  function updateTie()
  {
    setTurn(prev => prev = prevWinner);
    const Tie = JSON.parse(localStorage.getItem(`${gameMode}-tie`));
    localStorage.setItem(`${gameMode}-tie`, Tie + 1);
    const newTie = JSON.parse(localStorage.getItem(`${gameMode}-tie`));
    setTie(newTie);
  }

  function changeTurn() {
    setTurn((prev) => prev === "X" ? "O" : "X");
  }

  function reset()
  {
    setState((prev) => prev + 1);
    setTurn(prev => prevWinner ? prevWinner : "X");
    setWinner(prev => "");
  }
 
  return (
    <div className="container">
      <Header click={reset} currentTurn={turn}></Header>
      <Board key={state} display={changeTurn} updateWin={setVictory} 
      updateTie={updateTie} reset={reset} currentTurn={turn} prevWinner={prevWinner} winner={winner}></Board>
      <Footer x={xWin} o={oWin} t={tie}></Footer>
    </div>
  )
}

