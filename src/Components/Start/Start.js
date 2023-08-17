import React, { useEffect, useRef, useState } from "react";
import Xmark from "../../Marks/Xmark";
import Omark from "../../Marks/Omark";
import "./Start.css";
import { Link, useNavigate } from "react-router-dom";
import PendingState from "../PendingState/PendingState";
export default function Start({mark, changeMark}){
    const [name, setName] = React.useState("slider x-chosen");
    const [pendingActive, setPendingActive] = useState(false);
    const [navigateTimeOut, setNavTimeOut] = useState(null);
    const navigate = useNavigate();
    const durations = [7500, 10000, 15000, 13500, 16500];
    const delayDuration = useRef(durations[Math.floor(Math.random() * durations.length)]);
    function handleClick(mark) {
        changeMark(mark);
        setName(prev => mark === "X" ? prev = "slider x-chosen" : prev = "slider o-chosen")
    }

    function loadPlayerModeGame() {
        setPendingActive(prev => true);
        setNavTimeOut(prev => setTimeout(() => {
            navigate("player-game");
        }, delayDuration.current))
    }
    
    function cancelPending()
    {
        clearTimeout(navigateTimeOut);
        setPendingActive(prev => false);
        delayDuration.current = durations[Math.floor(Math.random() * durations.length)];
    }

    return (
        <div className="app">
            <div class="start">
                <div class="symbols">
                    <span><Xmark size="2.9em" color="#31c4be"></Xmark></span>
                    <span><Omark size="2.2em" color="#f2b237"></Omark></span>
                </div>
                <div class="pick">
                    <h4 class="title">PICK PLAYER 1'S MARK</h4>
                    <div class="option-bar">
                        <span className="mark-section" id="x-mark" onClick={() => handleClick("X")}><Xmark size="3em" color={mark === "X" ? "rgba(25,42,50,255)" : "#a9bdc5"}></Xmark></span>
                        <span className="mark-section" id="o-mark" onClick={() => handleClick("O")}><Omark size="2.35em" color={mark === "O" ? "rgba(25,42,50,255)" : "#a9bdc5"}></Omark></span>
                        <span className={name}></span>
                    </div>
                    <h5 class="notice">REMEMBER : X GOES FIRST</h5>
                </div>
                <div class="buttons">
                    <Link to="/cpu-game">
                        <button class="new-game-btn" id="cpu">NEW GAME (VS CPU)</button>
                    </Link>
                    <button class="new-game-btn" id="player" onClick={() => loadPlayerModeGame()}>NEW GAME (VS PLAYER)</button>
                </div>
                
            </div>
            {pendingActive && <PendingState playerMark={mark} delayDuration={delayDuration.current} cancelPending={cancelPending}></PendingState>}
        </div>
    )
}