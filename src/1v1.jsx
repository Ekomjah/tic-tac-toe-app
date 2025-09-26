import { useState } from "react";
import NameModal from "./userNameModal";
export default function Onevone() {
  const xoArr = new Array(9).fill(null);
  const [isClicked, setIsClicked] = useState(true);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const [msg, setMsg] = useState("X starts!");
  const [gameArr, setGameArr] = useState(xoArr);
  const [isModalShowing, setIsModalShowing] = useState(true);
  function reset() {
    setGameArr(xoArr);
    setIsClicked(true);
    setMsg(player1 + " starts!");
  }
  function gameShow(index) {
    if (msg.includes("winner") || gameArr[index] !== null) return;

    const newArr = [...gameArr];
    newArr[index] = isClicked ? "X" : "O";

    const winArrIndex = gameLogic(newArr);
    if (winArrIndex !== undefined) {
      setMsg(isClicked ? player1 + " is the winner!" : player2 + " is the winner!");
    } else if (newArr.every((val) => val !== null)) {
      setMsg("Its a draw!");
    } else {
      setMsg(isClicked ? "Next Player: " + player2 : "Next Player: " + player1);
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
      (group) =>
        group.every((item) => arr[item] === "X") || group.every((item) => arr[item] === "O")
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
      </div>
      <div className="app-btn">
        <button onClick={reset} className="reset" id="reset">
          RESET BOARD
        </button>
        <button onClick={() => setIsModalShowing(true)} className="cta">
          New Game
        </button>
      </div>
      <a href="https://www.exploratorium.edu/explore/puzzles/tictactoe" target="_blank">
        How to play?
      </a>
      <NameModal
        isModalShowing={isModalShowing}
        setPlayer1={setPlayer1}
        setPlayer2={setPlayer2}
        player1={player1}
        player2={player2}
        setIsModalShowing={setIsModalShowing}
      />
    </>
  );
}
