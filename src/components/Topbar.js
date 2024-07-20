import React from 'react';
import profileIcon from '../cat.jpg';

function Topbar({ username, onLogout, onClearData, onViewLeaderboard, onViewGame }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <img src={profileIcon} alt="Profile" className="profile-icon" />
        <span className="username">{username}</span>
      </div>
      <div className="topbar-center">
        <nav>
          <button onClick={onViewGame}>Games</button>
          <button onClick={onViewLeaderboard}>Leaderboard</button>
          <button onClick={onClearData}>Clear Data</button>
        </nav>
      </div>
      <div className="topbar-right">
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Topbar;
