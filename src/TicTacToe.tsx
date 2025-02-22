import { createContext, useContext, useState } from "react";
import { NavbarAndBody } from "./Home";

const ContextPlayApi = createContext<{
  status: string;
  setStatus: (status: string) => void;
}>({
  status: "",
  setStatus: () => {},
});

export default function TicTacToe() {
  const [status, setStatus] = useState("");
  return (
    <NavbarAndBody>
      <div className="text-white font-[Permanent_Marker] h-[calc(100vh-62px)] flex justify-center items-center gap-5">
        <ContextPlayApi.Provider value={{ status, setStatus }}>
          {status === "" ? (
            <Choose />
          ) : status === "single" ? (
            <Single />
          ) : (
            <Multi />
          )}
        </ContextPlayApi.Provider>
      </div>
    </NavbarAndBody>
  );
}

function Multi() {
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState("");
  const [gameStatus, setGameStatus] = useState("");
  const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => {
    return (
      <div
        key={i}
        className="bg-red-600 text-center content-center w-24 h-24 text-4xl cursor-pointer duration-300 hover:bg-red-800"
        onClick={(element) => {
          setTurn(turn === "X" ? "O" : "X");
          element.currentTarget.textContent = turn;
          element.currentTarget.style.pointerEvents = "none";
          const cellsContent = Array.from(
            element.currentTarget.parentElement?.children || []
          );
          function disableCells() {
            cellsContent.forEach((cell) => {
              (cell as HTMLElement).style.pointerEvents = "none";
            });
          }
          if (
            (cellsContent[0].textContent ?? "").length > 0 &&
            (cellsContent[1].textContent ?? "").length > 0 &&
            (cellsContent[2].textContent ?? "").length > 0 &&
            cellsContent[0].textContent === cellsContent[1].textContent &&
            cellsContent[0].textContent === cellsContent[2].textContent
          ) {
            disableCells();
            setWinner(cellsContent[0].textContent ?? "");
            setGameStatus("win");
          } else if (
            (cellsContent[3].textContent ?? "").length > 0 &&
            (cellsContent[4].textContent ?? "").length > 0 &&
            (cellsContent[5].textContent ?? "").length > 0 &&
            cellsContent[3].textContent === cellsContent[4].textContent &&
            cellsContent[3].textContent === cellsContent[5].textContent
          ) {
            disableCells();
            setWinner(cellsContent[3].textContent ?? "");
            setGameStatus("win");
          } else if (
            (cellsContent[6].textContent ?? "").length > 0 &&
            (cellsContent[7].textContent ?? "").length > 0 &&
            (cellsContent[8].textContent ?? "").length > 0 &&
            cellsContent[6].textContent === cellsContent[7].textContent &&
            cellsContent[6].textContent === cellsContent[8].textContent
          ) {
            disableCells();
            setWinner(cellsContent[6].textContent ?? "");
            setGameStatus("win");
          } else if (
            (cellsContent[0].textContent ?? "").length > 0 &&
            (cellsContent[3].textContent ?? "").length > 0 &&
            (cellsContent[6].textContent ?? "").length > 0 &&
            cellsContent[0].textContent === cellsContent[3].textContent &&
            cellsContent[0].textContent === cellsContent[6].textContent
          ) {
            disableCells();
            setWinner(cellsContent[0].textContent ?? "");
            setGameStatus("win");
          } else if (
            (cellsContent[1].textContent ?? "").length > 0 &&
            (cellsContent[4].textContent ?? "").length > 0 &&
            (cellsContent[7].textContent ?? "").length > 0 &&
            cellsContent[1].textContent === cellsContent[4].textContent &&
            cellsContent[1].textContent === cellsContent[7].textContent
          ) {
            disableCells();
            setWinner(cellsContent[1].textContent ?? "");
            setGameStatus("win");
          } else if (
            (cellsContent[2].textContent ?? "").length > 0 &&
            (cellsContent[5].textContent ?? "").length > 0 &&
            (cellsContent[8].textContent ?? "").length > 0 &&
            cellsContent[2].textContent === cellsContent[5].textContent &&
            cellsContent[2].textContent === cellsContent[8].textContent
          ) {
            disableCells();
            setWinner(cellsContent[2].textContent ?? "");
            setGameStatus("win");
          } else if (
            (cellsContent[0].textContent ?? "").length > 0 &&
            (cellsContent[4].textContent ?? "").length > 0 &&
            (cellsContent[8].textContent ?? "").length > 0 &&
            cellsContent[0].textContent === cellsContent[4].textContent &&
            cellsContent[0].textContent === cellsContent[8].textContent
          ) {
            disableCells();
            setWinner(cellsContent[0].textContent ?? "");
            setGameStatus("win");
          } else if (
            (cellsContent[2].textContent ?? "").length > 0 &&
            (cellsContent[4].textContent ?? "").length > 0 &&
            (cellsContent[6].textContent ?? "").length > 0 &&
            cellsContent[2].textContent === cellsContent[4].textContent &&
            cellsContent[2].textContent === cellsContent[6].textContent
          ) {
            disableCells();
            setWinner(cellsContent[2].textContent ?? "");
            setGameStatus("win");
          } else if (
            (cellsContent[0].textContent ?? "").length > 0 &&
            (cellsContent[1].textContent ?? "").length > 0 &&
            (cellsContent[2].textContent ?? "").length > 0 &&
            (cellsContent[3].textContent ?? "").length > 0 &&
            (cellsContent[4].textContent ?? "").length > 0 &&
            (cellsContent[5].textContent ?? "").length > 0 &&
            (cellsContent[6].textContent ?? "").length > 0 &&
            (cellsContent[7].textContent ?? "").length > 0 &&
            (cellsContent[8].textContent ?? "").length > 0
          ) {
            disableCells();
            setGameStatus("draw");
          }
        }}
      ></div>
    );
  });
  return (
    <div className="text-white">
      <div className="text-center text-3xl mb-5 pointer-events-none">
        {turn} Turn
      </div>
      <div className="grid grid-cols-3 gap-1.5 relative">
        {gameStatus === "win" ? (
          <div
            className={`bg-emerald-500 text-center absolute left-[50%] top-[50%] translate-[-50%] w-full py-5 text-3xl`}
          >
            {winner} Player Is Win
          </div>
        ) : null}
        {gameStatus === "draw" ? (
          <div
            className={`bg-gray-500 text-center absolute left-[50%] top-[50%] translate-[-50%] w-full py-5 text-3xl`}
          >
            Draw
          </div>
        ) : null}
        {cells}
      </div>
      <div
        className="text-center text-3xl mt-5 cursor-pointer duration-300 hover:text-red-600"
        onClick={() => window.location.reload()}
      >
        Again
      </div>
    </div>
  );
}
function Single() {
  const [player, setPlayer] = useState("");
  const [gamePlayer, setGamePlayer] = useState("");
  const [gameStatus, setGameStatus] = useState("");
  const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => {
    return (
      <div
        key={i}
        className="bg-red-600 text-center content-center w-24 h-24 text-4xl cursor-pointer duration-300 hover:bg-red-800"
        onClick={(element) => {
          element.currentTarget.textContent = gamePlayer;
          element.currentTarget.style.pointerEvents = "none";
          const cellsContent = Array.from(
            element.currentTarget.parentElement?.children ?? []
          );
          function disableCells() {
            cellsContent.forEach((e) => {
              (e as HTMLElement).style.pointerEvents = "none";
            });
          }
          const emptyCellsContent = cellsContent.filter(
            (e) => e.textContent === ""
          );
          if (emptyCellsContent.length > 0) {
            const randomElement =
              emptyCellsContent[
                Math.trunc(Math.random() * emptyCellsContent.length)
              ];
            randomElement.textContent = gamePlayer === "X" ? "O" : "X";
            (randomElement as HTMLElement).style.pointerEvents = "none";
          }
          if (
            (cellsContent[0].textContent ?? "").length > 0 &&
            (cellsContent[1].textContent ?? "").length > 0 &&
            (cellsContent[2].textContent ?? "").length > 0 &&
            cellsContent[0].textContent === cellsContent[1].textContent &&
            cellsContent[0].textContent === cellsContent[2].textContent
          ) {
            disableCells();
            if (cellsContent[0].textContent === gamePlayer) {
              setGameStatus("win");
            } else {
              setGameStatus("lose");
            }
          } else if (
            (cellsContent[3].textContent ?? "").length > 0 &&
            (cellsContent[4].textContent ?? "").length > 0 &&
            (cellsContent[5].textContent ?? "").length > 0 &&
            cellsContent[3].textContent === cellsContent[4].textContent &&
            cellsContent[3].textContent === cellsContent[5].textContent
          ) {
            disableCells();
            if (cellsContent[3].textContent === gamePlayer) {
              setGameStatus("win");
            } else {
              setGameStatus("lose");
            }
          } else if (
            (cellsContent[6].textContent ?? "").length > 0 &&
            (cellsContent[7].textContent ?? "").length > 0 &&
            (cellsContent[8].textContent ?? "").length > 0 &&
            cellsContent[6].textContent === cellsContent[7].textContent &&
            cellsContent[6].textContent === cellsContent[8].textContent
          ) {
            disableCells();
            if (cellsContent[6].textContent === gamePlayer) {
              setGameStatus("win");
            } else {
              setGameStatus("lose");
            }
          } else if (
            (cellsContent[0].textContent ?? "").length > 0 &&
            (cellsContent[3].textContent ?? "").length > 0 &&
            (cellsContent[6].textContent ?? "").length > 0 &&
            cellsContent[0].textContent === cellsContent[3].textContent &&
            cellsContent[0].textContent === cellsContent[6].textContent
          ) {
            disableCells();
            if (cellsContent[0].textContent === gamePlayer) {
              setGameStatus("win");
            } else {
              setGameStatus("lose");
            }
          } else if (
            (cellsContent[1].textContent ?? "").length > 0 &&
            (cellsContent[4].textContent ?? "").length > 0 &&
            (cellsContent[7].textContent ?? "").length > 0 &&
            cellsContent[1].textContent === cellsContent[4].textContent &&
            cellsContent[1].textContent === cellsContent[7].textContent
          ) {
            disableCells();
            if (cellsContent[1].textContent === gamePlayer) {
              setGameStatus("win");
            } else {
              setGameStatus("lose");
            }
          } else if (
            (cellsContent[2].textContent ?? "").length > 0 &&
            (cellsContent[5].textContent ?? "").length > 0 &&
            (cellsContent[8].textContent ?? "").length > 0 &&
            cellsContent[2].textContent === cellsContent[5].textContent &&
            cellsContent[2].textContent === cellsContent[8].textContent
          ) {
            disableCells();
            if (cellsContent[2].textContent === gamePlayer) {
              setGameStatus("win");
            } else {
              setGameStatus("lose");
            }
          } else if (
            (cellsContent[0].textContent ?? "").length > 0 &&
            (cellsContent[4].textContent ?? "").length > 0 &&
            (cellsContent[8].textContent ?? "").length > 0 &&
            cellsContent[0].textContent === cellsContent[4].textContent &&
            cellsContent[0].textContent === cellsContent[8].textContent
          ) {
            disableCells();
            if (cellsContent[0].textContent === gamePlayer) {
              setGameStatus("win");
            } else {
              setGameStatus("lose");
            }
          } else if (
            (cellsContent[2].textContent ?? "").length > 0 &&
            (cellsContent[4].textContent ?? "").length > 0 &&
            (cellsContent[6].textContent ?? "").length > 0 &&
            cellsContent[2].textContent === cellsContent[4].textContent &&
            cellsContent[2].textContent === cellsContent[6].textContent
          ) {
            disableCells();
            if (cellsContent[2].textContent === gamePlayer) {
              setGameStatus("win");
            } else {
              setGameStatus("lose");
            }
          } else if (
            (cellsContent[0].textContent ?? "").length > 0 &&
            (cellsContent[1].textContent ?? "").length > 0 &&
            (cellsContent[2].textContent ?? "").length > 0 &&
            (cellsContent[3].textContent ?? "").length > 0 &&
            (cellsContent[4].textContent ?? "").length > 0 &&
            (cellsContent[5].textContent ?? "").length > 0 &&
            (cellsContent[6].textContent ?? "").length > 0 &&
            (cellsContent[7].textContent ?? "").length > 0 &&
            (cellsContent[8].textContent ?? "").length > 0
          ) {
            disableCells();
            setGameStatus("draw");
          }
        }}
      ></div>
    );
  });
  return (
    <>
      {player === "o" ? (
        <div className="text-white">
          <div className="text-center text-3xl mb-5 pointer-events-none">
            {gamePlayer} Player
          </div>
          <div className="grid grid-cols-3 gap-1.5 relative">
            {gameStatus === "win" ? (
              <div
                className={`bg-emerald-500 text-center absolute left-[50%] top-[50%] translate-[-50%] w-full py-5 text-3xl`}
              >
                You Win
              </div>
            ) : null}
            {gameStatus === "lose" ? (
              <div
                className={`bg-red-900 text-center absolute left-[50%] top-[50%] translate-[-50%] w-full py-5 text-3xl`}
              >
                You Lose
              </div>
            ) : null}
            {gameStatus === "draw" ? (
              <div
                className={`bg-gray-600 text-center absolute left-[50%] top-[50%] translate-[-50%] w-full py-5 text-3xl`}
              >
                Draw
              </div>
            ) : null}
            {cells}
          </div>
          <div
            className="text-center text-3xl mt-5 cursor-pointer duration-300 hover:text-red-600"
            onClick={() => window.location.reload()}
          >
            Again
          </div>
        </div>
      ) : player === "x" ? (
        <div className="text-white">
          <div className="text-center text-3xl mb-5 pointer-events-none">
            {gamePlayer} Player
          </div>
          <div className="grid grid-cols-3 gap-1.5 relative">
            {gameStatus === "win" ? (
              <div
                className={`bg-emerald-500 text-center absolute left-[50%] top-[50%] translate-[-50%] w-full py-5 text-3xl`}
              >
                You Win
              </div>
            ) : null}
            {gameStatus === "lose" ? (
              <div
                className={`bg-red-900 text-center absolute left-[50%] top-[50%] translate-[-50%] w-full py-5 text-3xl`}
              >
                You Lose
              </div>
            ) : null}
            {gameStatus === "draw" ? (
              <div
                className={`bg-gray-600 text-center absolute left-[50%] top-[50%] translate-[-50%] w-full py-5 text-3xl`}
              >
                Draw
              </div>
            ) : null}
            {cells}
          </div>
          <div
            className="text-center text-3xl mt-5 cursor-pointer duration-300 hover:text-red-600"
            onClick={() => window.location.reload()}
          >
            Again
          </div>
        </div>
      ) : (
        <>
          <div className="text-white">
            <button
              className="text-2xl px-5 py-2.5 bg-red-500 cursor-pointer duration-300 hover:bg-red-700 mr-5"
              onClick={() => {
                setPlayer("x");
                setGamePlayer("X");
              }}
            >
              X Player
            </button>
            <button
              className="text-2xl px-5 py-2.5 bg-red-500 cursor-pointer duration-300 hover:bg-red-700"
              onClick={() => {
                setPlayer("o");
                setGamePlayer("O");
              }}
            >
              O Player
            </button>
          </div>
        </>
      )}
    </>
  );
}
function Choose() {
  const { setStatus } = useContext(ContextPlayApi);
  return (
    <>
      <button
        onClick={() => setStatus("multi")}
        className="text-2xl px-5 py-2.5 bg-red-500 cursor-pointer duration-300 hover:bg-red-700"
      >
        Multi
      </button>
      <button
        onClick={() => setStatus("single")}
        className="text-2xl px-5 py-2.5 bg-red-500 cursor-pointer duration-300 hover:bg-red-700"
      >
        Single
      </button>
    </>
  );
}
