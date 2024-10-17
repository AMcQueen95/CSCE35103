// PlayActionDisplay.js
import React, { useState, useEffect } from 'react';
import './PlayActionDisplay.css'; // Import CSS for styling

function PlayActionDisplay({ players, backToEntryScreen }) {
  const [countdown, setCountdown] = useState(10); // 10-second countdown

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          // Start the game logic here
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const redTeamPlayers = players.filter((player) => player.playerTeam === 'Red');
  const greenTeamPlayers = players.filter((player) => player.playerTeam === 'Green');

  return (
    <div className="play-action-container">
      <div className="retro-tv-screen">
        <div className="crt-overlay"></div> {/* CRT screen effect */}
        <div className="team-window">
          <h2 className="red">Red Team</h2> {/* Light red title */}
          {redTeamPlayers.map((player) => (
            <div key={player.playerID} className="player-slot">
              <p className="equipment-id">Equipment ID: {player.equipmentID}</p>
              <p className="player-id">Player ID: {player.playerID}</p>
              <p className="player-name">Player Name: {player.playerName}</p>
            </div>
          ))}
        </div>
        <div className="team-window">
          <h2 className="green">Green Team</h2> {/* Light green title */}
          {greenTeamPlayers.map((player) => (
            <div key={player.playerID} className="player-slot">
              <p className="equipment-id">Equipment ID: {player.equipmentID}</p>
              <p className="player-id">Player ID: {player.playerID}</p>
              <p className="player-name">Player Name: {player.playerName}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="countdown-timer">Game Starts in {countdown} seconds</div>
      <button className="back-button" onClick={backToEntryScreen}>
        Back
      </button>
    </div>
  );
}

export default PlayActionDisplay;
