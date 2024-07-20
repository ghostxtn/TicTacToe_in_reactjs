import React, { useState, useEffect } from 'react';
import Board from './Board';
import calculateWinner from '../utils/calculateWinner';
import makeAIMove from '../utils/makeAIMove';

export default function TicTacToeWithBombs({ username, players, setPlayers }) {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [bombs, setBombs] = useState(1);  // Each player gets 1 bomb
  const [selectedLine, setSelectedLine] = useState('');
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

  const handleBomb = () => {
    if (bombs > 0 && selectedLine) {
      const nextSquares = currentSquares.slice();
      selectedLine.forEach(index => nextSquares[index] = null);
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
      setBombs(bombs - 1);
      setSelectedLine('');
    }
  };

  const jumpTo = (move) => {
    setCurrentMove(move);
    setSelectedMove(move.toString());
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setBombs(1);
    setSelectedLine('');
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
      <h1 className="game-title">Tic Tac Toe with Bombs</h1>
      <div className="game">
        <div className="game-board">
          <Board squares={currentSquares} onSquareClick={handlePlay} />
        </div>
        <div className="game-info">
          <div>{username} Wins: {xWins}</div>
          <div>AI Wins: {oWins}</div>
          <div>Bombs left: {bombs}</div>
          <div className='gameboard-buttons'>
          <select value={selectedMove} onChange={(e) => jumpTo(Number(e.target.value))}>
            {moves}
          </select>
          <button onClick={resetGame}>Reset Game</button>
          <div className="bomb-com">
          <select
            value={selectedLine}
            onChange={(e) => setSelectedLine(e.target.value ? JSON.parse(e.target.value) : '')}
          >
            <option value="">Select a line to bomb</option>
            <option value={JSON.stringify([0, 1, 2])}>Bomb Row 1</option>
            <option value={JSON.stringify([3, 4, 5])}>Bomb Row 2</option>
            <option value={JSON.stringify([6, 7, 8])}>Bomb Row 3</option>
            <option value={JSON.stringify([0, 3, 6])}>Bomb Column 1</option>
            <option value={JSON.stringify([1, 4, 7])}>Bomb Column 2</option>
            <option value={JSON.stringify([2, 5, 8])}>Bomb Column 3</option>
            <option value={JSON.stringify([0, 4, 8])}>Bomb Diagonal 1</option>
            <option value={JSON.stringify([2, 4, 6])}>Bomb Diagonal 2</option>
          </select>
          <button onClick={handleBomb} disabled={!selectedLine || bombs <= 0}>Use Bomb</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
