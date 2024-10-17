import React, { useState, useEffect } from 'react';
import './PlayActionDisplay.css';

function PlayActionDisplay({ players, backToEntryScreen }) {
  //10 second countdown
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          //future game logic starts here
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  //team names
  const redTeamPlayers = players.filter((player) => player.playerTeam === 'Red');
  const greenTeamPlayers = players.filter((player) => player.playerTeam === 'Green');

  return (
    <div className="play-action-container">
      <div className="retro-tv-screen">
        <div className="crt-overlay"></div>
        <div className="team-window">
          <h2 className="red">Red Team</h2> 
          {redTeamPlayers.map((player) => (
            <div key={player.playerID} className="player-slot">
              <p className="equipment-id">Equipment ID: {player.equipmentID}</p>
              <p className="player-id">Player ID: {player.playerID}</p>
              <p className="player-name">Player Name: {player.playerName}</p>
            </div>
          ))}
        </div>
        <div className="team-window">
          <h2 className="green">Green Team</h2>
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
