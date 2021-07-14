import react, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function Board() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [squares, setSquares] = useState(["", "", "", "", "", "", "", "", ""]);
  const [gameOver, setGameOver] = useState(false);
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 8]
  ];

  useEffect(() => {
    for (const combo of winningCombos) {
      const p1 = combo[0];
      const p2 = combo[1];
      const p3 = combo[2];
      if (
        squares[p1] === squares[p2] &&
        squares[p2] === squares[p3] &&
        squares[p1] &&
        squares[p2] &&
        squares[p3]
      ) {
        console.log("winner");
        setGameOver(true);
        break;
      }
    }
  }, [currentPlayer, squares]);

  const clickSquare = function (e) {
    const index = e.target.dataset.key;
    if (squares[index]) return;
    if (gameOver) return;
    newIndex = [...squares];
    newIndex[index] = currentPlayer;
    setSquares(newIndex);
    if (currentPlayer === "X") {
      setCurrentPlayer("O");
    } else {
      setCurrentPlayer("X");
    }

    // setSquares(squares[index] = currentPlayer)
  };

  const reset = function () {
    setSquares(["", "", "", "", "", "", "", "", ""]);
    setCurrentPlayer("X");
    setGameOver(false)
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <button onClick={reset}>Reset</button>
      {gameOver ? <h3>Game Over, winner: {currentPlayer === 'X' ? 'O' : 'X'}</h3> : ""}
      <div className="board">
        {squares.map((square, i) => {
          return (
            <div data-key={i} onClick={clickSquare} className="square">
              {square}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Board />, rootElement);
