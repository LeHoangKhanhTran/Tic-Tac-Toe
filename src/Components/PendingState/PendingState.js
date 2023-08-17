import React, { useEffect, useState } from "react";
import Xmark from "../../Marks/Xmark";
import Omark from "../../Marks/Omark";
import pending from "./pending.svg";
import "./PendingState.css";
export default function PendingState({playerMark, delayDuration, cancelPending}) {
  const display = React.useRef("block");
  const [name, setName] = useState("content inactive");
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
    setTimeout(() => {
      changeAllDisplay();
    }, delayDuration - 900);
  }, []);

  return (
    <div className="win-state" style={{display: display.current}}>
      <div className={name}>
        <section>
          <h2 className="assertion" style={{color: playerMark === "X" ? "#31c4be" : "#f2b237"}}>
            YOU ARE {playerMark === "X" ? <span className="mark-text"><Xmark size="1.2em" color="#31c4be"></Xmark></span> : <span className="mark-text o"><Omark size="0.9em" color="#f2b237"></Omark></span>}!
          </h2>
        </section>
        <section className="pending">
          <h3>SEARCHING FOR AN OPPONENT</h3>
          <img src={pending}/>
        </section>
        <section className="btn-zone">
          <button id="quit" onClick={() => cancelPending()}>CANCEL</button>
        </section>
      </div>
      <div class="background"></div>
    </div>
    )
}