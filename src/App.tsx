import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Landing from "./Landing";
import TicTacToe from "./TicTacToe";
import TypeSpeedTest from "./TypeSpeedTest";
import MemoryBlocks from "./MemoryBlocks";
import Hangman from "./Hangman";
import GuessTheWord from "./GuessTheWord";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/ticTacToe" element={<TicTacToe />} />
          <Route path="/home/typeSpeedTest" element={<TypeSpeedTest />} />
          <Route path="/home/memoryBlocks" element={<MemoryBlocks />} />
          <Route path="/home/hangman" element={<Hangman />} />
          <Route path="/home/guessTheWord" element={<GuessTheWord />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
