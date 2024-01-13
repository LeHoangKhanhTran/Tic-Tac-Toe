import React, { useContext } from "react";
import "./Footer.css";
import { GameModeContext, PlayerMarkContext } from "../../App";
export default function Footer({x, o, t})
{
    const mode = useContext(GameModeContext);
    const playerMark = useContext(PlayerMarkContext);
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