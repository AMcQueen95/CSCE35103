import './EntryScreen.css';
import React from 'react';
import { useState } from 'react';
import { addPlayerToDatabase, getPlayerByID } from './api';
import { playerDoesNotExist } from './api';

// This is the individual player slot (includes player name and id)
function PlayerSlot({equipmentID, playerID, playerName}) {
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
function PlayerIDPopup({togglePopup, addPlayer, playerTeam}) {
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
    }

    // const popupStateClassName = {
        
        
    //     name:
    // };

    const handleSubmit = async () => {
        
        //addPlayer(inputValue, playerTeam);
        
        //Right here we do a check on the database, for debugging right now, it just returns true so that I can see next screen popup
        //If the player is not in the database, we enter this statement
        
        //third a function that takes a playerID and a playerName to add to the database.
        if(popupState === 0) {
            const doesNotExist = await playerDoesNotExist(playerID); // Await the function

            if (doesNotExist) { // If it returns true
                console.log("Checking database for " + playerID);
                setPopupState(1);
            } else {
                setPlayerName(await getPlayerByID(playerID)); // Await this if it's also an async function
                console.log(playerID + " found with player name " + playerName);
                setPopupState(2);
            }
        }

        if(popupState === 1)
        {
            console.log("Adding " + playerName + " to database with ID " + playerID);
            addPlayerToDatabase(playerID, playerName);
            setPopupState(2);
        }
        
        if(popupState === 2)
        {
            // Here we now call the new addplayer script with appropriate information
            //
            
            setPopupState(0);
            setPlayerID(0);
            setPlayerName('');
            setEquipmentID(0);
            
            addPlayer(playerID, playerName, equipmentID);

            togglePopup();
        }
        //togglePopup();
    }
    
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

// This is the Entry Screen in its entirty (includes player entry slots, controls, etc.)
function EntryScreen() {
    const [popup, setPopup] = useState({ isShown: false });
    const [players, setPlayers] = useState([
        {equipmentID: null, playerID: null, playerName: null, playerTeam: null}
    ]);
    // const [nextId, setNextId] = useState({redTeam: 0, greenTeam: 0});
    const [currentPlayerTeam, setCurrentPlayerTeam] = useState("Red");
    
    // This is the spot where the database connection will go/the actual function call where players are added.
    //Rylans Old stuff from first iteration
//     const addPlayer = (playerName, playerTeam) => {
//         setPlayers(prevPlayers => {
//             const newID = nextId[playerTeam === "Red" ? "redTeam" : "greenTeam"];
//             const updatedPlayers = [
//                 ...prevPlayers,
//                 { playerID: newID, playerName: playerName, playerTeam: playerTeam }
//             ];
//             return updatedPlayers;
//         });
    //Rylans old front end code

    const addPlayer = async (playerID, playerName, equipmentID) => {
        // const frontendID = nextId[playerTeam === 'Red' ? 'redTeam' : 'greenTeam']

        // // for backend (to ensure unique IDs), red team IDs will be range 0 - 14 while 
        // // green team IDs will be range 15 - 29
        // // note: 1-indexed
        // const backendID = nextId[playerTeam === 'Red' ? frontendID + 1 : frontendID + 16]
        // const savedPlayer = await addPlayerToDatabase(backendID, playerName) // return null (for now) if duplicate name

        // if (savedPlayer) {
            console.log("New player added: \nEquipmentID: " + equipmentID + "\nPlayerID: " + playerID + "\nPlayerName: " + playerName + "\nPlayerTeam: " + currentPlayerTeam);
            setPlayers((prevPlayers) => {
                const updatedPlayers = [
                ...prevPlayers,
                {equipmentID: equipmentID, playerID: playerID, playerName: playerName, playerTeam: currentPlayerTeam }
              ];
              return updatedPlayers; // <-- Return the updated player list
            });
        // }
    }
    
    
    const togglePopup = (playerTeam) => {
        setPopup(prevPopup => ({ isShown: !prevPopup.isShown }));
        setCurrentPlayerTeam(playerTeam);
    };

    const entryClass = {name: `PlayerEntryInput ${popup.isShown ? "Shown" : ""}`};
    
    return (
        <div>
            <div id="_PlayerEntryPopup" className={entryClass.name}>
                <PlayerIDPopup togglePopup={togglePopup} addPlayer={addPlayer} playerTeam={currentPlayerTeam}></PlayerIDPopup>
            </div>
            <div className="EntrySlots">
                <div className="Red Team">
                    <p>Red Team</p>
                    <div className="Header">
                        <p className="EquipmentID">Equipment ID</p>
                        <p className="PlayerID">Player ID</p>
                        <p className="PlayerName">Player Name</p>
                    </div>
                    {/* Right here is where the player list gets populated, so this is probably where a backend entry point would be */}
                    {players
                        .filter(player => player.playerID != null && player.playerTeam === "Red")
                        .map((player) => (
                            <PlayerSlot key={player.playerID} equipmentID={player.equipmentID} playerID={player.playerID} playerName={player.playerName}/>
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
                        .filter(player => player.playerID != null && player.playerTeam === "Green")
                        .map((player) => (
                            <PlayerSlot key={player.playerID} equipmentID={player.equipmentID} playerID={player.playerID} playerName={player.playerName}/>
                    ))}
                    <button onClick={() => togglePopup("Green")}>Add Player</button>
                </div>
            </div>
        </div>
    );
}
        

export default EntryScreen;