import './EntryScreen.css';
import React from 'react';
import { useState } from 'react';
import { addPlayerToDatabase } from './api';

// This is the individual player slot (includes player name and id)
function PlayerSlot({playerID, playerName}) {
    return (
        <div className="PlayerSlot">
            <p className="PlayerID">{playerID}</p>
            <p className="PlayerName">{playerName}</p>
        </div>
    );
}

function PlayerEntryPopup({togglePopup, addPlayer, playerTeam}) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    function handleSubmit() {
        console.log("Submitting player.")
        addPlayer(inputValue, playerTeam);
        togglePopup();
    }
    
    return (
        <div className="EntryPopupBox">
            <label>
                Player Name: <input value={inputValue} onChange={handleInputChange} className="PlayerNameInput" />
            </label>
            <button onClick={handleSubmit}>Submit Player</button>
        </div>
    );
}

// This is the Entry Screen in its entirty (includes player entry slots, controls, etc.)
function EntryScreen() {
    const [popup, setPopup] = useState({ isShown: false });
    const [players, setPlayers] = useState([
        {playerID: null, playerName: null, playerTeam: null}
    ]);
    const [nextId, setNextId] = useState({redTeam: 0, greenTeam: 0});
    const [currentPlayerTeam, setCurrentPlayerTeam] = useState("Red");
    
    // This is the spot where the database connection will go/the actual function call where players are added.
    const addPlayer = async (playerName, playerTeam) => {
        // ID between 0-14 for both teams, shown client-side 
        const frontendID = nextId[playerTeam === 'Red' ? 'redTeam' : 'greenTeam']

        // for backend (to ensure unique IDs), red team IDs will be range 0 - 14 while 
        // green team IDs will be range 15 - 29
        // note: 1-indexed
        const backendID = nextId[playerTeam === 'Red' ? frontendID + 1 : frontendID + 16]

        const savedPlayer = await addPlayerToDatabase(backendID, playerName) // return null (for now) if duplicate name

        if (savedPlayer) {
            setPlayers((prevPlayers) => {
              const updatedPlayers = [
                ...prevPlayers,
                { playerID: frontendID, playerName: playerName, playerTeam: playerTeam }
              ];
              return updatedPlayers; // <-- Return the updated player list
            });
        

            setNextId(prevNextId => ({
                ...prevNextId,
                [playerTeam === "Red" ? "redTeam" : "greenTeam"]: prevNextId[playerTeam === "Red" ? "redTeam" : "greenTeam"] + 1
            }));
        }
    }
    
    
    const togglePopup = (playerTeam) => {
        setPopup(prevPopup => ({ isShown: !prevPopup.isShown }));
        setCurrentPlayerTeam(playerTeam);
    };

    const entryClass = {name: `PlayerEntryInput ${popup.isShown ? "Shown" : ""}`};
    
    return (
        <div>
            <div id="_PlayerEntryPopup" className={entryClass.name}>
                <PlayerEntryPopup togglePopup={togglePopup} addPlayer={addPlayer} playerTeam={currentPlayerTeam}></PlayerEntryPopup>
            </div>
            <div className="EntrySlots">
                <div className="Red Team">
                    <p>Red Team</p>
                    
                    {/* Right here is where the player list gets populated, so this is probably where a backend entry point would be */}
                    {players
                        .filter(player => player.playerID != null && player.playerTeam === "Red")
                        .map((player) => (
                            <PlayerSlot key={player.playerID} playerID={player.playerID} playerName={player.playerName}/>
                    ))}
                    <button onClick={() => togglePopup("Red")}>Add Player</button>
                </div>
                <div className="Green Team">
                    <p>Green Team</p>
                    {players
                        .filter(player => player.playerID != null && player.playerTeam === "Green")
                        .map((player) => (
                            <PlayerSlot key={player.playerID} playerID={player.playerID} playerName={player.playerName}/>
                    ))}
                    <button onClick={() => togglePopup("Green")}>Add Player</button>
                </div>
            </div>
        </div>
    );
}
        

export default EntryScreen;