import React, { useState, useEffect, useMemo } from 'react';
import './PlayActionDisplay.css';

// Import audio files
import Track01 from './Tracks/Track01.mp3';
import Track02 from './Tracks/Track02.mp3';
import Track03 from './Tracks/Track03.mp3';
import Track04 from './Tracks/Track04.mp3';
import Track05 from './Tracks/Track05.mp3';
import Track06 from './Tracks/Track06.mp3';
import Track07 from './Tracks/Track07.mp3';
import Track08 from './Tracks/Track08.mp3';

function PlayActionDisplay({ players, resetGame }) {
  const [initialCountdown, setInitialCountdown] = useState(30);
  const [secondaryCountdown, setSecondaryCountdown] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const tracks = useMemo(() => [Track01, Track02, Track03, Track04, Track05, Track06, Track07, Track08], []);

  useEffect(() => {
    // Initial countdown timer
    const timer = setInterval(() => {
      setInitialCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          setSecondaryCountdown(6 * 60);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (initialCountdown === 18 && !audioPlaying) {
      const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
      const audio = new Audio(randomTrack);
      audio.play();
      setAudioPlaying(true);
    }
  }, [initialCountdown, audioPlaying, tracks]);

  useEffect(() => {
    if (secondaryCountdown === null) return;
    if (secondaryCountdown <= 0) return;

    const timer = setInterval(() => {
      setSecondaryCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondaryCountdown]);

  const redTeamPlayers = players.filter((player) => player.playerTeam === 'Red');
  const greenTeamPlayers = players.filter((player) => player.playerTeam === 'Green');

  const playActionsCountdown = {
    countdown: `countdown ${initialCountdown > 0 ? 'Shown' : ''}`,
    playActions: `play-actions ${initialCountdown === 0 ? 'Shown' : ''}`,
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="play-action-container">
      <div className="retro-tv-screen">
        <div className="crt-overlay"></div>
        
        <div className="team-window">
          <h2 className="red">Red Team</h2>
          {redTeamPlayers.map((player) => (
            <div key={player.playerID} className="player-slot">
              <p className="player-name">
                {player.playerName} <span className="player-score">Score: {player.score}</span>
              </p>
            </div>
          ))}
        </div>
        
        <div className="team-window">
          <h2 className="green">Green Team</h2>
          {greenTeamPlayers.map((player) => (
            <div key={player.playerID} className="player-slot">
              <p className="player-name">
                {player.playerName} <span className="player-score">Score: {player.score}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="play-actions-countdown-container">
        <div className={playActionsCountdown.countdown}>
          <p className="countdown-timer">Game Starts in {initialCountdown} seconds</p>
        </div>
      </div>

      <div className={`event-box ${initialCountdown === 0 ? 'large' : ''}`}></div>

      {secondaryCountdown !== null && (
        <div className="secondary-timer">
          <p className="secondary-timer-text">Time Remaining: {formatTime(secondaryCountdown)}</p>
        </div>
      )}

      <button className="back-button" onClick={resetGame}>Back</button>
    </div>
  );
}

export default PlayActionDisplay;
