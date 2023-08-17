import './App.css';
import {Routes, Route} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import Start from './Components/Start/Start';
import Game from './Components/Game/Game';
import React from 'react';

function App() {
  const [playerMark, setPlayerMark] = React.useState("X");

  function switchMark(mark)
  {
    setPlayerMark(prev => prev = mark);
  }
  
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Start mark={playerMark} changeMark={switchMark}></Start>}></Route>
        <Route path="cpu-game" element={<Game gameMode="CPU" playerMark={playerMark} switchMark={switchMark}/>}></Route>
        <Route path="player-game" element={<Game gameMode="Player" playerMark={playerMark} switchMark={switchMark}/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;
