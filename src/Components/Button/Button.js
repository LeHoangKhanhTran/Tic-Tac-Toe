import React from "react";
import { useEffect } from "react";
import Xmark from '../../Marks/Xmark';
import Omark from '../../Marks/Omark';
import "./Button.css"

export default function Button({row, column, value, onClick, winner, winSquares, disabled}) {
    let isWinSquare = false;
    
    function checkWinSquare()
    {
        const squaresRow = Object.values(winSquares.slice());
        squaresRow.forEach(element => {
            if(element[0] === row && element[1] === column)
            {
                isWinSquare = true;
            }
        })
    }

    function getColor()
    {
        if (!winner)
        {
           if (value === "X") return "#31c4be";
           else return "#f2b237";
        }
        else
        {
           if (isWinSquare)
           {
              return "rgba(31,53,64,255)";
           }
           else 
           {
              if (value === "X") return "#31c4be";
              else return "#f2b237";
           }
        }
    }

    function getBackgroundColor()
    {
        if (!winner)
        {
           return "rgba(31,53,64,255)";
        }
        else
        {
           checkWinSquare();
           if (isWinSquare)
           {
              if (winner === "X") return "#31c4be";
              else return "#f2b237";
           }
           else 
           {
              return "#1F3540";
           }
        }
    }

    const buttonStyle = {
        backgroundColor: getBackgroundColor(),
        padding: value === "X" ? "9px 0" : "17px 5px 17px 0"
    } 

    return (
        <div className="button" style={buttonStyle} onClick={() => {onClick(row, column)}} disabled={disabled}>
        {!value ? "" : value === "X" ? <Xmark size="5em" color={getColor()}></Xmark> : <Omark size="3.9em" color={getColor()}></Omark>}
        </div>
    )
}