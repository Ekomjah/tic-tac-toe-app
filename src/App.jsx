import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const xoArr = new Array(9).fill(null);
  const [isClicked, setIsClicked] = useState(true);
  const [msg, setMsg] = useState("X starts!");
  const [gameArr, setGameArr] = useState(xoArr);
  function reset() {
    setGameArr(xoArr);
    setIsClicked(true);
    setMsg("X starts!");
  }
  function gameShow(index) {
    if (msg.includes("winner") || gameArr[index] !== null) return;

    const newArr = [...gameArr];
    newArr[index] = isClicked ? "X" : "O";

    const winArrIndex = gameLogic(newArr);
    if (winArrIndex !== undefined) {
      setMsg(isClicked ? "X is the winner!" : "O is the winner!");
    } else if (newArr.every((val) => val !== null)) {
      setMsg("Its a draw!");
    } else {
      setMsg(isClicked ? "Next Player: O" : "Next Player: X");
    }

    setGameArr(newArr);
    setIsClicked(!isClicked);
  }

  function gameLogic(arr) {
    const winArr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winArr.find(
      (group, index) =>
        group.every((item, i) => arr[item] === "X") ||
        group.every((item, i) => arr[item] === "O")
    );
  }

  return (
    <>
      <h1>A Tic-Tac-Toe game!</h1>
      <div className="btn-container">
        {msg && <p className="message">{msg}</p>}

        {gameArr.map((item, index) => (
          <button
            className="square"
            key={index}
            onClick={() => {
              gameShow(index);
            }}
          >
            {item}
          </button>
        ))}
        <button onClick={reset} className="reset" id="reset">
          RESET BOARD
        </button>
      </div>
      <a href="https://www.exploratorium.edu/explore/puzzles/tictactoe">
        How to play?
      </a>
    </>
  );
}

export default App;
