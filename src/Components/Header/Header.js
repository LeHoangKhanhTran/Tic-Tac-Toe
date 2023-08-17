import React from "react";
import "./Header.css";
import Xmark from "../../Marks/Xmark";
import Omark from "../../Marks/Omark";
export default function Header({click, currentTurn}) {
    const symbolStyle = {
         top: currentTurn === "X" ? "3.5px" : "6px",
         left: currentTurn === "X" ? "18px" : "10px"
    }
    return (
    <div className="header">
        <div className="icon">
            <span><Xmark size="2.8em" color="#31c4be"></Xmark></span>
            <span><Omark size="2.1em" color="#f2b237"></Omark></span>
        </div>
        <div className="turn"><span class="symbol" style={symbolStyle}>{currentTurn === "X" ? <Xmark size="1.8em" color="#31c4be"></Xmark> : <Omark size="1.4em" color="#f2b237"></Omark> }</span> TURN</div>
        <button className="refresh" onClick={click}>
        <svg xmlns="http://www.w3.org/2000/svg" height="1.4em" viewBox="0 0 512 512"><g fill='#213454'><path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/></g></svg>
        </button>
    </div>
    )
}