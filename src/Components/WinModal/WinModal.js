import React, { useContext, useEffect, useState } from "react";
import Xmark from '../../Marks/Xmark';
import Omark from '../../Marks/Omark';
import './WinModal.css';
import { Link } from "react-router-dom";
import { GameModeContext, PlayerMarkContext } from "../../App";
export default function WinState({ winner, prevWinner, reset }) {
  const display = React.useRef("block");
  const [name, setName] = React.useState("content inactive");
  const mode = useContext(GameModeContext);
  const playerMark = useContext(PlayerMarkContext);
  const currentWinner = winner ? winner : prevWinner;
  
  function getWinnerName()
  {
    if (currentWinner === playerMark) return "YOU";
    else if (mode === "CPU") return "CPU";
    else return "YOUR OPPONENT";
  }

  function changeDisplay()
  {
    if (display.current === "none") {  
      display.current = "block";
    }
    else {
      display.current = "none";
      changeName();
    }
  }

  function changeName()
  {
    setName(prev => prev == "content inactive" ? prev = "content active" : prev = "content inactive");
  }

  function changeAllDisplay() 
  {
    setTimeout(() => {
      changeName();
    }, 200);
    setTimeout(() => {
      changeDisplay();
    }, 700);
  }

  useEffect(() => {
    setTimeout(() => {
      setName(prev => "content active");
    }, 200);
  }, []);
  
  return (
    <div className="win-state" style={{display: display.current}}>
      <div className={name}>
        {winner ? <h4 className="announce">&nbsp; &nbsp; &nbsp;{getWinnerName()} WON!</h4> : <h4 className="announce">TIE MATCH!</h4>}
          <section>
            <h1 style={{color: currentWinner === "X" ? "#31c4be" : "#f2b237"}}>
              {currentWinner === "X" ? <span class="x-mark"><Xmark size="2.3em" color="#31c4be"></Xmark></span> : <span class="o-mark"><Omark size="1.8em" color="#f2b237"></Omark></span>}
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;TAKES THE ROUND
            </h1>
          </section>
          <section className="btn-zone">
            <Link to="/">
              <button id="quit">QUIT</button>
            </Link>
            <button id="next-round" onClick={reset}>NEXT ROUND</button>
          </section>
      </div>
      <div class="background" onClick={() => {changeAllDisplay()}}></div>
    </div>
    )
}