const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 

export const addPlayerToDatabase = async (equipmentId, playerID, playerCodeName) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/player`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                equipmentId: equipmentId,
                codename: playerCodeName, 
                id: playerID,}), 
        });

        if (!response.ok) {
            throw new Error('Failed to add player');
        }

        return await response.json(); // Return added player & success code
    } catch (error) {
        console.error('Error adding player: ', error);  
        return null;
    }
}


export const playerDoesNotExist = async (playerID) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/player/${playerID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to return boolean from database codename function');
        }

        return await response.json();
    } catch (error) {
        console.error('Error querying database codename');
        return null;
    }
}