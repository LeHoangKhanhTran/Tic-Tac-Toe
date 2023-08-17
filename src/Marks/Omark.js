import React from "react";

export default function Omark({size, color}){
    return (
        <svg id="o" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 64 64"><g fill={color}><path d="M32 2C15.4 2 2 15.4 2 32s13.4 30 30 30s30-13.4 30-30S48.6 2 32 2m0 51c-11.6 0-21-9.4-21-21s9.4-21 21-21s21 9.4 21 21s-9.4 21-21 21"/></g></svg>
    )
}
    