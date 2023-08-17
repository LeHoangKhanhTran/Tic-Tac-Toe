import React from "react";
import "./Footer.css";
export default function Footer({x, o, t, playerMark, mode})
{
    return (
        <div className="footer">
            <div className="record" id="x-win">
                X ({playerMark === "X" ? "YOU" : mode === "CPU" ? "CPU" : "OPPONENT"})
                <div className="count">{x}</div>
            </div>
            <div className="record" id="ties">
                TIES
                <div className="count">{t}</div>
            </div>
            <div className="record" id="o-win">
                O ({playerMark === "O" ? "YOU" : mode === "CPU" ? "CPU" : "OPPONENT"})
                <div className="count">{o}</div>
            </div>
        </div>
    )
}