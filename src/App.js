import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Topbar from './components/Topbar';
import TicTacToe from './components/TicTacToe';
import TicTacToeWithBombs from './components/TicTacToeWithBombs';
import TicTacToe10x10 from './components/TicTacToe10x10';
import Leaderboard from './components/Leaderboard';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [view, setView] = useState('games'); // 'games', 'tic-tac-toe', 'tic-tac-toe-with-bombs', 'tic-tac-toe-10x10', 'leaderboard'
    const [players, setPlayers] = useState([]);
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedPlayers = localStorage.getItem('players');

        if (storedUsername) {
            setUsername(storedUsername);
            setIsLoggedIn(true);
        }
        if (storedPlayers) setPlayers(JSON.parse(storedPlayers));
    }, []);

    const handleLogin = (username, password) => {
        const existingPlayer = players.find(player => player.username === username);
        if (existingPlayer) {
            if (existingPlayer.password === password) {
                setUsername(username);
                setIsLoggedIn(true);
                setLoginError('');
            } else {
                setLoginError('Incorrect password');
            }
        } else {
            const newPlayer = { username, password, wins: 0, defeats: 0, totalGames: 0 };
            setPlayers([...players, newPlayer]);
            setUsername(username);
            setIsLoggedIn(true);
            setLoginError('');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        localStorage.removeItem('username');
    };

    const handleClearData = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setUsername('');
        setPlayers([]);
        alert('All data has been cleared.');
    };

    const handleViewLeaderboard = () => {
        setView('leaderboard');
    };

    const handleViewGames = () => {
        setView('games');
    };

    const handleViewTicTacToe = () => {
        setView('tic-tac-toe');
    };

    const handleViewTicTacToeWithBombs = () => {
        setView('tic-tac-toe-with-bombs');
    };

    const handleViewTicTacToe10x10 = () => {
        setView('tic-tac-toe-10x10');
    };

    const handlePhoneVerification = () => {
        // Implement your phone verification logic here
        alert('Phone verification process initiated.');
    };

    return (
        <div className="app-container">
            {!isLoggedIn ? (
                <Login onLogin={handleLogin} loginError={loginError} onPhoneVerification={handlePhoneVerification} />
            ) : (
                <>
                    <Topbar
                        username={username}
                        onLogout={handleLogout}
                        onClearData={handleClearData}
                        onViewLeaderboard={handleViewLeaderboard}
                        onViewGame={handleViewGames}
                    />
                    {view === 'games' && (
                        <div className="games-container">
                            <div className='game-choices'>
                                <button id="simple-tic-tac-toe" className='game-choice' onClick={handleViewTicTacToe}>Simple Tic Tac Toe</button>
                                <button id="tic-tac-toe-with-bombs" className='game-choice' onClick={handleViewTicTacToeWithBombs}>Tic Tac Toe with Bombs</button>
                                <button id="tic-tac-toe-10x10" className='game-choice' onClick={handleViewTicTacToe10x10}>Tic Tac Toe 10x10</button>
                                {/* Add more game buttons here */}
                            </div>
                        </div>
                    )}
                    {view === 'tic-tac-toe' && <TicTacToe username={username} players={players} setPlayers={setPlayers} />}
                    {view === 'tic-tac-toe-with-bombs' && <TicTacToeWithBombs username={username} players={players} setPlayers={setPlayers} />}
                    {view === 'tic-tac-toe-10x10' && <TicTacToe10x10 username={username} players={players} setPlayers={setPlayers} />}
                    {view === 'leaderboard' && <Leaderboard players={players} />}
                </>
            )}
        </div>
    );
}

export default App;
