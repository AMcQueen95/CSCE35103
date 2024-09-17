import './EntryScreen.css';
import React from 'react';
import { useState } from 'react';

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

    //This is the function where appropriate data would go to send data back to the database.
    function sendDataBackToDatabase() {
        console.log("Sending data back to database")
        addPlayer(inputValue, playerTeam);
        togglePopup();
    }
    
    return (
        <div className="EntryPopupBox">
            <label>
                Player Name: <input value={inputValue} onChange={handleInputChange} className="PlayerNameInput" />
            </label>
            <button onClick={sendDataBackToDatabase}>Submit Player</button>
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

    const addPlayer = (playerName, playerTeam) => {
        // State change will cause component re-render
        setPlayers([
            ...players,
            { playerID: nextId.redTeam, playerName: playerName, playerTeam: playerTeam }
        ]);
        if(playerTeam === "Red") {
            setNextId({redTeam: nextId.redTeam + 1});
        }   
        if(playerTeam === "Green") {
            setNextId({greenTeam: nextId.greenTeam + 1});
        }
    }
    
    
    const togglePopup = () => {
        setPopup({ isShown: !popup.isShown });
    };

    const entryClass = {name: `PlayerEntryInput ${popup.isShown ? "Shown" : ""}`};
    
    return (
        <div>
            <div id="_PlayerEntryPopup" className={entryClass.name}>
                <PlayerEntryPopup togglePopup={togglePopup} addPlayer={addPlayer} playerTeam={"Red"}></PlayerEntryPopup>
            </div>
            <div className="EntrySlots">
                <div className="Red Team">
                    <p>Red Team</p>
                    {players
                        .filter(player => player.playerID != null && player.playerTeam === "Red")
                        .map((player) => (
                            <PlayerSlot key={player.playerID} playerID={player.playerID} playerName={player.playerName}/>
                    ))}
                    <button onClick={togglePopup}>Add Player</button>
                </div>
                <div className="Green Team">
                    <p>Green Team</p>
                    <PlayerSlot></PlayerSlot>
                    <PlayerSlot></PlayerSlot>
                    <PlayerSlot></PlayerSlot>
                    <PlayerSlot></PlayerSlot>
                    <PlayerSlot></PlayerSlot>
                    <PlayerSlot></PlayerSlot>
                    <PlayerSlot></PlayerSlot>
                    <PlayerSlot></PlayerSlot>
                    <PlayerSlot></PlayerSlot>
                    <PlayerSlot></PlayerSlot>
                    <PlayerSlot></PlayerSlot>
                    <PlayerSlot></PlayerSlot>
                    <PlayerSlot></PlayerSlot>
                    <PlayerSlot></PlayerSlot>
                    <PlayerSlot></PlayerSlot>
                    <PlayerSlot></PlayerSlot>
                    <PlayerSlot></PlayerSlot>
                    <PlayerSlot></PlayerSlot>
                    <PlayerSlot></PlayerSlot>
                    <PlayerSlot></PlayerSlot>
                    <button onClick={togglePopup}>Add Player</button>
                </div>
            </div>
        </div>
    );
}
        

export default EntryScreen;