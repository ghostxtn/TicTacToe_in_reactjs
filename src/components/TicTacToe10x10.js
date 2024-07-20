import React, { useState, useEffect } from 'react';
import Square from './Square';

function Board({ squares, onSquareClick }) {
  const renderSquare = (i) => (
    <Square value={squares[i]} onSquareClick={() => onSquareClick(i)} />
  );

  const boardSize = 9;
  const rows = [];

  for (let row = 0; row < boardSize; row++) {
    const squares = [];
    for (let col = 0; col < boardSize; col++) {
      squares.push(renderSquare(row * boardSize + col));
    }
    rows.push(<div key={row} className="board-row">{squares}</div>);
  }

  return <>{rows}</>;
}

function calculateWinner(squares) {
  const size = 10;
  const lines = [];

  // Horizontal lines
  for (let row = 0; row < size; row++) {
    for (let col = 0; col <= size - 5; col++) {
      lines.push([
        row * size + col,
        row * size + col + 1,
        row * size + col + 2,
        row * size + col + 3,
        row * size + col + 4,
      ]);
    }
  }

  // Vertical lines
  for (let col = 0; col < size; col++) {
    for (let row = 0; row <= size - 5; row++) {
      lines.push([
        row * size + col,
        (row + 1) * size + col,
        (row + 2) * size + col,
        (row + 3) * size + col,
        (row + 4) * size + col,
      ]);
    }
  }

  // Diagonal lines (top-left to bottom-right)
  for (let row = 0; row <= size - 5; row++) {
    for (let col = 0; col <= size - 5; col++) {
      lines.push([
        row * size + col,
        (row + 1) * size + col + 1,
        (row + 2) * size + col + 2,
        (row + 3) * size + col + 3,
        (row + 4) * size + col + 4,
      ]);
    }
  }

  // Diagonal lines (top-right to bottom-left)
  for (let row = 0; row <= size - 5; row++) {
    for (let col = 4; col < size; col++) {
      lines.push([
        row * size + col,
        (row + 1) * size + col - 1,
        (row + 2) * size + col - 2,
        (row + 3) * size + col - 3,
        (row + 4) * size + col - 4,
      ]);
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
      return squares[a];
    }
  }
  return null;
}

function makeAIMove(squares) {
  const emptySquares = squares.reduce((acc, val, idx) => {
    if (val === null) {
      acc.push(idx);
    }
    return acc;
  }, []);

  if (emptySquares.length === 0) {
    return -1;
  }

  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randomIndex];
}

export default function TicTacToe10x10({ username, players, setPlayers }) {
  const [history, setHistory] = useState([Array(100).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [selectedMove, setSelectedMove] = useState('0');
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  useEffect(() => {
    if (!xIsNext) {
      const aiMove = makeAIMove(currentSquares);
      if (aiMove !== -1) {
        setTimeout(() => handlePlay(aiMove), 500);
      }
    }
  }, [xIsNext, currentSquares]);

  const handlePlay = (i) => {
    if (calculateWinner(currentSquares) || currentSquares[i]) {
      return;
    }
    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const winner = calculateWinner(nextSquares);
    if (winner) {
      const updatedPlayers = players.map((player) => {
        if (player.username === username) {
          if (winner === 'X') {
            player.wins += 1;
          } else if (winner === 'O') {
            player.defeats += 1;
          }
          player.totalGames += 1;
        }
        return player;
      });
      setPlayers(updatedPlayers);
      if (winner === 'X') {
        setXWins(xWins + 1);
      } else if (winner === 'O') {
        setOWins(oWins + 1);
      }
    }
  };

  const jumpTo = (move) => {
    setCurrentMove(move);
    setSelectedMove(move.toString());
  };

  const resetGame = () => {
    setHistory([Array(100).fill(null)]);
    setCurrentMove(0);
    setSelectedMove('0');
  };

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <option key={move} value={move}>{description}</option>
    );
  });

  return (
    <div className="game-container">
      <h1 className="game-title">Tic Tac Toe 10x10</h1>
      <div className="game">
        <div className="game-board">
          <Board squares={currentSquares} onSquareClick={handlePlay} />
        </div>
        <div className="game-info">
          <div>{username} Wins: {xWins}</div>
          <div>AI Wins: {oWins}</div>
          <div className='gameboard-buttons'>
            <select value={selectedMove} onChange={(e) => jumpTo(Number(e.target.value))}>
              {moves}
            </select>
            <button onClick={resetGame}>Reset Game</button>
          </div>
        </div>
      </div>
    </div>
  );
}
