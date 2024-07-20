import React from 'react';

function Leaderboard({ players }) {
  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Wins</th>
            <th>Defeats</th>
            <th>Total Games</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.username}>
              <td>{player.username}</td>
              <td>{player.wins}</td>
              <td>{player.defeats}</td>
              <td>{player.totalGames}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
