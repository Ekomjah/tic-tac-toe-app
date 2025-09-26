import { useState, useRef, useEffect } from "react";

export default function OnevComp() {
  const xoArr = new Array(9).fill(null);
  const [isClicked, setIsClicked] = useState(true); // true => X to play
  const [msg, setMsg] = useState("X starts!");
  const [gameArr, setGameArr] = useState(xoArr);
  const [isWaiting, setIsWaiting] = useState(false); // while AI is "thinking"
  const pendingTimeoutRef = useRef(null);
  const AI_DELAY_MS = 500; // change this to make O appear faster/slower

  useEffect(() => {
    return () => {
      // cleanup on unmount
      if (pendingTimeoutRef.current) {
        clearTimeout(pendingTimeoutRef.current);
        pendingTimeoutRef.current = null;
      }
    };
  }, []);

  function reset() {
    // clear pending AI move, reset states
    if (pendingTimeoutRef.current) {
      clearTimeout(pendingTimeoutRef.current);
      pendingTimeoutRef.current = null;
    }
    setGameArr(xoArr);
    setIsClicked(true);
    setMsg("X starts!");
    setIsWaiting(false);
  }

  // kept for reuse if needed
  function computerTurn() {
    const copyGameArr = [...gameArr];
    const onlyNullIndexes = copyGameArr
      .map((item, index) => (item === null ? index : -1))
      .filter((index) => index !== -1);
    if (onlyNullIndexes.length === 0) return;
    const randomLength = Math.floor(Math.random() * onlyNullIndexes.length);
    const randomEl = onlyNullIndexes[randomLength];
    return gameShow(randomEl);
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
    setIsClicked((prev) => !prev);
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
        group.every((item) => arr[item] === "X") ||
        group.every((item) => arr[item] === "O"),
    );
  }

  function pickRandomIndex(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  // small single handler keeps onClick tiny
  function handleClick(index) {
    // block while waiting for AI or if game over / occupied
    if (isWaiting) return;
    if (msg.includes("winner") || gameArr[index] !== null) return;

    // If current player is X (human), place X now and schedule AI O after delay
    if (isClicked) {
      // place X immediately (snapshot)
      const snapshot = [...gameArr];
      snapshot[index] = "X";

      // did X win immediately?
      if (gameLogic(snapshot) !== undefined) {
        // set final state, no AI move
        setGameArr(snapshot);
        setMsg("X is the winner!");
        setIsClicked(false);
        return;
      }

      // update UI to show X immediately, set waiting flag and flip turn to O
      setGameArr(snapshot);
      setMsg("Next Player: O");
      setIsClicked(false);
      setIsWaiting(true);

      // schedule AI move using the snapshot (so we don't rely on state inside timeout)
      pendingTimeoutRef.current = setTimeout(() => {
        // clear ref early so reset() can detect and prevent running
        pendingTimeoutRef.current && clearTimeout(pendingTimeoutRef.current);
        pendingTimeoutRef.current = null;

        // if game was reset/changed meanwhile, ensure we still operate on our snapshot
        const board = [...snapshot];

        // compute available slots
        const onlyNullIndexes = board
          .map((it, i) => (it === null ? i : -1))
          .filter((i) => i !== -1);

        if (onlyNullIndexes.length === 0) {
          // draw after player's move
          setGameArr(board);
          setMsg("Its a draw!");
          setIsWaiting(false);
          setIsClicked(true); // next would be X if continued
          return;
        }

        // pick AI index and place O
        const aiIndex = pickRandomIndex(onlyNullIndexes);
        board[aiIndex] = "O";

        // check results after AI move
        if (gameLogic(board) !== undefined) {
          setGameArr(board);
          setMsg("O is the winner!");
          setIsWaiting(false);
          setIsClicked(true);
          return;
        }

        if (board.every((v) => v !== null)) {
          setGameArr(board);
          setMsg("Its a draw!");
          setIsWaiting(false);
          setIsClicked(true);
          return;
        }

        // normal case: AI placed O, back to X's turn
        setGameArr(board);
        setMsg("Next Player: X");
        setIsWaiting(false);
        setIsClicked(true);
      }, AI_DELAY_MS);

      return;
    }

    // Else current player is O (human) — behave as before (single move)
    gameShow(index);
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
            onClick={() => handleClick(index)}
            // visually indicate disabled when waiting (optional)
            disabled={isWaiting}
          >
            {item}
          </button>
        ))}
        <button onClick={reset} className="reset" id="reset">
          RESET BOARD
        </button>
      </div>
      <a
        href="https://www.exploratorium.edu/explore/puzzles/tictactoe"
        target="_blank"
        rel="noreferrer"
      >
        How to play?
      </a>
    </>
  );
}
