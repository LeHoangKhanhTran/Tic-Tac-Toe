import './App.css';
import {Routes, Route} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import Start from './Components/Start/Start';
import Game from './Components/Game/Game';
import React, { createContext } from 'react';
export const PlayerMarkContext = createContext(null);
export const GameModeContext = createContext(null);
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
          <Route path="cpu-game" element={
            <GameModeContext.Provider value="CPU">
              <PlayerMarkContext.Provider value={playerMark}>
                <Game/>
              </PlayerMarkContext.Provider>
            </GameModeContext.Provider>
          }></Route>
        
        <Route path="player-game" element={
          <GameModeContext.Provider value="Player">
            <PlayerMarkContext.Provider value={playerMark}>
              <Game gameMode="Player" playerMark={playerMark} switchMark={switchMark}/>
            </PlayerMarkContext.Provider>
          </GameModeContext.Provider>
        }></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;
