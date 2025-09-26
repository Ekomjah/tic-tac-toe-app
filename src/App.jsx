import { useState } from "react";
import "./App.css";
import VsFriend from "./1v1.jsx";
import VsComp from "./1vComp.jsx";

function App() {
  const [openTab, setOpenTab] = useState("");
  return (
    <>
      {!openTab ? (
        <div>
          <h1>A Tic-Tac-Toe game!</h1>
          <div className="app-btn">
            <button
              style={{ color: "white", background: "green" }}
              onClick={() => setOpenTab("vsFriend")}
            >
              Play a friend
            </button>
            <button
              className="!bg-purple-700 !text-white"
              onClick={() => setOpenTab("vsComp")}
            >
              Play vs Computer
            </button>
          </div>
        </div>
      ) : openTab === "vsFriend" ? (
        <VsFriend />
      ) : (
        <VsComp />
      )}
    </>
  );
}

export default App;
