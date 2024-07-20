import React, { useState, useEffect } from 'react';
import Board from './Board';
import calculateWinner from '../utils/calculateWinner';
import makeAIMove from '../utils/makeAIMove';

export default function TicTacToe({ username, players, setPlayers }) {
  const [history, setHistory] = useState([Array(9).fill(null)]);
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
    setHistory([Array(9).fill(null)]);
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
      <h1 className="game-title">Tic Tac Toe</h1>
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
