import './EntryScreen.css';

// This is the individual player slot (includes player name and id)
function PlayerEntrySlot() {
    return (
        <div></div>
    );
}

// This is the Entry Screen in its entirty (includes player entry slots, controls, etc.)
function EntryScreen() {
    return (
        <div>
            <div className="EntrySlots">
                <div className="Red Team">
                    
                </div>
                <div className="Green Team">

                </div>
            </div>
        </div>
    );
}

export default EntryScreen;