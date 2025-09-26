import { useState } from "react";
export default function ModalFunc({
  isModalShowing,
  setPlayer1,
  setPlayer2,
  player1,
  player2,
  setIsModalShowing,
  setGameArr,
}) {
  const [isSpan1Hidden, setIsSpan1Hidden] = useState(true);
  const [isSpan2Hidden, setIsSpan2Hidden] = useState(true);
  const xoArr = new Array(9).fill(null);

  function onsubmit(e) {
    e.preventDefault();
    if (!player1 || !player2) {
      setIsSpan1Hidden(false);
      setIsSpan2Hidden(false);
    } else {
      setIsSpan1Hidden(true);
      setIsSpan2Hidden(true);
      setIsModalShowing(!isModalShowing);
      setGameArr(xoArr);
      return;
    }
  }
  return (
    <>
      {isModalShowing && (
        <div className="modal-container">
          <div className="bgModal"></div>
          <div className="modal">
            <form onSubmit={(e) => onsubmit(e)}>
              <label htmlFor="player1">
                <div className="nameTag">Your name:</div>
                <input
                  type="text"
                  value={player1}
                  className="border-1 bg-gray-700 text-gray-50 font-medium"
                  onChange={(e) => setPlayer1(e.target.value)}
                  placeholder="Your name..."
                  name="player1"
                  id="player1"
                />
                <span className="error" hidden={isSpan1Hidden}>
                  Enter your name
                </span>
              </label>
              <label htmlFor="player2">
                <div className="nameTag">Your friend&apos;s:</div>
                <input
                  type="text"
                  className="border-1 bg-gray-700 text-gray-50 font-medium"
                  value={player2}
                  onChange={(e) => setPlayer2(e.target.value)}
                  name="player2"
                  placeholder="Your friend's..."
                  id="player2"
                />
                <span className="error" hidden={isSpan2Hidden}>
                  Enter your friend&apos;s name
                </span>
              </label>
              <div className="button-container">
                <button type="submit" className="cta">
                  Start Game
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
