// EntryScreen.js
import './EntryScreen.css';
import React, { useState, useEffect } from 'react';
import { addPlayerToDatabase, getPlayerByID, sendEquipmentID, playerDoesNotExist } from './api';

// This is the individual player slot (includes player name and id)
function PlayerSlot({ equipmentID, playerID, playerName }) {
  return (
    <div className="PlayerSlot">
      <p className="EquipmentID">{equipmentID}</p>
      <p className="PlayerID">{playerID}</p>
      <p className="PlayerName">{playerName}</p>
    </div>
  );
}

// This is the first Player Popup, it prompts you for player ID and then checks the database for that ID
// If the ID cannot be found another popup will appear asking for new player name, but if player ID is found
// the equipment ID popup will appear.
function PlayerIDPopup({ togglePopup, addPlayer, playerTeam }) {
  const [popupState, setPopupState] = useState(0);
  const [playerID, setPlayerID] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [equipmentID, setEquipmentID] = useState(0);

  const handlePlayerIDChange = (event) => {
    setPlayerID(event.target.value);
  };
  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };
  const handleEquipmentIDChange = (event) => {
    setEquipmentID(event.target.value);
  };

  const handleSubmit = async () => {
    if (popupState === 0) {
      const doesNotExist = await playerDoesNotExist(playerID);

      if (doesNotExist) {
        console.log("Checking database for " + playerID);
        setPopupState(1);
      } else {
        const returnedPlayer = await getPlayerByID(playerID);
        setPlayerName(returnedPlayer);
        console.log(playerID + " found with player name " + playerName);
        setPopupState(2);
      }
    }

    if (popupState === 1) {
      console.log("Adding " + playerName + " to database with ID " + playerID);
      await addPlayerToDatabase(playerID, playerName);
      setPopupState(2);
    }

    if (popupState === 2) {
      // Here we now call the new addPlayer script with appropriate information
      addPlayer(playerID, playerName, equipmentID);

      // Reset state
      setPopupState(0);
      setPlayerID(0);
      setPlayerName('');
      setEquipmentID(0);

      togglePopup();
    }
  };

  return (
    <div className="EntryPopupBox">
      {/* This is state = 0, this is the part that requests your ID*/}
      <div className={"PlayerIDInput state" + popupState}>
        <label>
          Player ID: <input value={playerID} onChange={handlePlayerIDChange} type="number" />
        </label>
      </div>

      {/* This is state = 1, this is the part that if your ID is not in the database, it will request a player name for your new player */}
      <div className={"PlayerNameInput state" + popupState}>
        <p>Player ID: {playerID}</p>
        <label>
          Player Name: <input value={playerName} onChange={handlePlayerNameChange} type="text" />
        </label>
      </div>

      {/* This is state = 2, this is the final state of the popup, It displays the player name and ID and requests your equipment ID */}
      <div className={"EquipmentIDInput state" + popupState}>
        <p>Player ID: {playerID}</p>
        <p>Player Name: {playerName}</p>
        <label>
          Equipment ID: <input value={equipmentID} onChange={handleEquipmentIDChange} type="number" />
        </label>
      </div>
      <button onClick={handleSubmit}>Submit Player</button>
    </div>
  );
}

// This is the Entry Screen in its entirety (includes player entry slots, controls, etc.)
function EntryScreen({players, setPlayers, startGame}) {
  const [popup, setPopup] = useState({ isShown: false });
  // const [players, setPlayers] = useState([]);
  const [currentPlayerTeam, setCurrentPlayerTeam] = useState("Red");

  

  // Function to clear players (for task 4)
  const clearPlayers = () => {
    setPlayers([]);
  };

  // Add keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'F5') {
        event.preventDefault(); // Prevent default browser refresh
        startGame();
      }
      if (event.key === 'F12') {
        event.preventDefault(); // Prevent default browser action
        clearPlayers();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const addPlayer = async (playerID, playerName, equipmentID) => {
    console.log(
      "New player added: \nEquipmentID: " +
        equipmentID +
        "\nPlayerID: " +
        playerID +
        "\nPlayerName: " +
        playerName +
        "\nPlayerTeam: " +
        currentPlayerTeam
    );

    sendEquipmentID(equipmentID);

    setPlayers((prevPlayers) => {
      const updatedPlayers = [
        ...prevPlayers,
        {
          equipmentID: equipmentID,
          playerID: playerID,
          playerName: playerName,
          playerTeam: currentPlayerTeam,
        },
      ];
      return updatedPlayers;
    });
  };

  const togglePopup = (playerTeam) => {
    setPopup((prevPopup) => ({ isShown: !prevPopup.isShown }));
    setCurrentPlayerTeam(playerTeam);
  };

  const entryClass = {
    name: `PlayerEntryInput ${popup.isShown ? "Shown" : ""}`,
  };

  return (
    <div>
      <div id="_PlayerEntryPopup" className={entryClass.name}>
        <PlayerIDPopup
          togglePopup={togglePopup}
          addPlayer={addPlayer}
          playerTeam={currentPlayerTeam}
        ></PlayerIDPopup>
      </div>
      <div className="EntrySlots">
        <div className="Red Team">
          <p>Red Team</p>
          <div className="Header">
            <p className="EquipmentID">Equipment ID</p>
            <p className="PlayerID">Player ID</p>
            <p className="PlayerName">Player Name</p>
          </div>
          {/* Right here is where the player list gets populated */}
          {players
            .filter(
              (player) => player.playerID != null && player.playerTeam === "Red"
            )
            .map((player) => (
              <PlayerSlot
                key={player.playerID}
                equipmentID={player.equipmentID}
                playerID={player.playerID}
                playerName={player.playerName}
              />
            ))}
          <button onClick={() => togglePopup("Red")}>Add Player</button>
        </div>
        <div className="Green Team">
          <p>Green Team</p>
          <div className="Header">
            <p className="EquipmentID">Equipment ID</p>
            <p className="PlayerID">Player ID</p>
            <p className="PlayerName">Player Name</p>
          </div>
          {players
            .filter(
              (player) =>
                player.playerID != null && player.playerTeam === "Green"
            )
            .map((player) => (
              <PlayerSlot
                key={player.playerID}
                equipmentID={player.equipmentID}
                playerID={player.playerID}
                playerName={player.playerName}
              />
            ))}
          <button onClick={() => togglePopup("Green")}>Add Player</button>
        </div>
      </div>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export default EntryScreen;