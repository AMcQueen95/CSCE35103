import React, { useState, useEffect, useMemo, useRef } from 'react';
import './PlayActionDisplay.css';
import { sendCode } from './api';

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
  const [events, setEvents] = useState([]);
  const [playerScores, setPlayerScores] = useState({});
  const [teamScores, setTeamScores] = useState({ Red: 0, Green: 0 });

  const audioRef = useRef(null); // Reference to the audio object
  const hasStarted = useRef(false);

  //Store all the tracks in an array to be able to randomly select one.
  const tracks = useMemo(
    () => [Track01, Track02, Track03, Track04, Track05, Track06, Track07, Track08],
    []
  );

  useEffect(() => {
    // Initial countdown timer
    const timer = setInterval(() => {
      setInitialCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          if(!hasStarted.current) {
            setSecondaryCountdown(6 * 60);
            sendStartSignal(); // Send start signal to backend
            hasStarted.current = true;
          }
          
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
      audioRef.current = audio; // Store the audio object
      setAudioPlaying(true);
      console.log('Playing Track ' + randomTrack);
    }
  }, [initialCountdown, audioPlaying, tracks]);

  useEffect(() => {
    if (secondaryCountdown === null) return;
    if (secondaryCountdown <= 0) {
      // Game over
      return;
    }

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

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      // Stop audio if playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Send start signal to backend
  const sendStartSignal = async () => {
    console.log("Sending Start Code");
    sendCode(202);
  };

  //Polling the backend every 1 second for events.
  useEffect(() => {
    // Start polling every 5 seconds
    const interval = setInterval(() => {
      if(hasStarted.current) {
        // Fetch the data from the backend
        fetch('/api/checkForUpdates')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          data.forEach(message => {
            handleGameEvent(message);
          });
        })
        .catch(error => {
          console.error("Error fetching updates:", error);
        });
      }
    }, 1000); // Poll every 1 second

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);  // Empty dependency array means this runs only once, on mount


  // Handle game events received from backend
  const handleGameEvent = (message) => {
    // Example message formats:
    // "equipmentID1:equipmentID2" (player hit)
    // "equipmentID:43" or "equipmentID:53" (base hit)
    // Update events list and player/team scores accordingly

    const [senderId, targetId] = message.split(':');

    // Base hit codes
    const baseHitCodes = {
      '43': 'Green Base',
      '53': 'Red Base',
    };

    const playersByEquipmentId = {};
    players.forEach((player) => {
      playersByEquipmentId[player.equipmentId] = player;
    });

    if (baseHitCodes[targetId]) {
      // Base hit event
      const player = playersByEquipmentId[senderId];
      if (!player) return;

      const baseHit = baseHitCodes[targetId];
      const eventMessage = `${player.playerName} hit ${baseHit}`;
      console.log(`${player.playerName} hit ${baseHit}`);

      setEvents((prevEvents) => [...prevEvents, eventMessage]);

      // Update player's score and team score
      if (
        (baseHit === 'Green Base' && player.playerTeam === 'Red') ||
        (baseHit === 'Red Base' && player.playerTeam === 'Green')
      ) {
        updateScores(player.playerID, 100);
      }
    } else {
      // Player hit event
      const shooter = playersByEquipmentId[senderId];
      const target = playersByEquipmentId[targetId];

      if (!shooter || !target) return;

      const eventMessage = `${shooter.playerName} hit ${target.playerName}`;
      console.log(`${shooter.playerName} hit ${target.playerName}`);
    
      setEvents((prevEvents) => [...prevEvents, eventMessage]);

      // Determine if same team or opposing team
      if (shooter.playerTeam === target.playerTeam) {
        // Same team hit, deduct points
        updateScores(shooter.playerID, -10);
      } else {
        // Opposing team hit, add points
        updateScores(shooter.playerID, 10);
      }
    }
  };

  // Update player and team scores
  const updateScores = (playerID, scoreChange) => {
    setPlayerScores((prevScores) => {
      const newScore = (prevScores[playerID] || 0) + scoreChange;
      return { ...prevScores, [playerID]: newScore };
    });

    const player = players.find((p) => p.playerID === playerID);
    if (player) {
      setTeamScores((prevTeamScores) => {
        const team = player.playerTeam;
        const newTeamScore = prevTeamScores[team] + scoreChange;
        return { ...prevTeamScores, [team]: newTeamScore };
      });
    }
  };

  const redTeamPlayers = players
    .filter((player) => player.playerTeam === 'Red')
    .map((player) => ({
      ...player,
      score: playerScores[player.playerID] || 0,
    }))
    .sort((a, b) => b.score - a.score);

  const greenTeamPlayers = players
    .filter((player) => player.playerTeam === 'Green')
    .map((player) => ({
      ...player,
      score: playerScores[player.playerID] || 0,
    }))
    .sort((a, b) => b.score - a.score);

  const playActionsCountdown = {
    countdown: `countdown ${initialCountdown > 0 ? 'Shown' : ''}`,
    playActions: `play-actions ${initialCountdown === 0 ? 'Shown' : ''}`,
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle Back button click
  const handleBackButtonClick = () => {
    // Stop audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setAudioPlaying(false);
    }

    // Reset state if necessary
    setInitialCountdown(30);
    setSecondaryCountdown(null);
    setEvents([]);
    setPlayerScores({});
    setTeamScores({ Red: 0, Green: 0 });
    hasStarted.current = false;
    // Call the resetGame function passed as a prop
    resetGame();
  };

  return (
    <div className="play-action-container">
      <div className="retro-tv-screen">
        <div className="crt-overlay"></div>

        <div className="team-window">
          <h2 className="red">Red Team - {teamScores.Red} points</h2>
          {redTeamPlayers.map((player) => (
            <div key={player.playerID} className="player-slot">
              <span className="base-hit">B</span>
              <p className="player-name">{player.playerName}</p>
              <span className="player-score">Score: {player.score}</span>
            </div>
          ))}
        </div>

        <div className="team-window">
          <h2 className="green">Green Team - {teamScores.Green} points</h2>
          {greenTeamPlayers.map((player) => (
            <div key={player.playerID} className="player-slot">
              <p className="player-name">
                {player.playerName}{' '}
                <span className="player-score">Score: {player.score}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="play-actions-countdown-container">
        <div className={playActionsCountdown.countdown}>
          <p className="countdown-timer">
            Game Starts in {initialCountdown} seconds
          </p>
        </div>
      </div>

      {initialCountdown === 0 && (
        <div className={`event-box ${initialCountdown === 0 ? 'large' : ''}`}>
          <h2>Play Actions</h2>
          <div className="event-list">
            {events.map((event, index) => (
              <p key={index} className="event-item">
                {event}
              </p>
            ))}
          </div>
        </div>
      )}

      {secondaryCountdown !== null && secondaryCountdown > 0 && (
        <div className="secondary-timer">
          <p className="secondary-timer-text">
            Time Remaining: {formatTime(secondaryCountdown)}
          </p>
        </div>
      )}

      <button className="back-button" onClick={handleBackButtonClick}>
        Back
      </button>
    </div>
  );
}

export default PlayActionDisplay;
