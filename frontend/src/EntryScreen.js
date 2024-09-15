import './EntryScreen.css';

// This is the individual player slot (includes player name and id)
function PlayerSlot() {
    return (
        <div className="PlayerSlot">
            <p className="PlayerID"></p>
            <p className="PlayerName"></p>
        </div>
    );
}

function PlayerEntryPopup() {
    return (
        <div className="EntryPopupBox">
            <label>
                Player Name: <input />
            </label>
        </div>
    );
}

// This is the Entry Screen in its entirty (includes player entry slots, controls, etc.)
function EntryScreen() {
    return (
        <div>
            <div className="PlayerEntryInput">
                <PlayerEntryPopup></PlayerEntryPopup>
            </div>
            <div className="EntrySlots">
                <div className="Red Team">
                    <p>Red Team</p>
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
                    <button>Add Player</button>
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
                    <button>Add Player</button>
                </div>
            </div>
        </div>
    );
}

export default EntryScreen;