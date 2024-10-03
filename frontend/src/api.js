const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 

export const addPlayerToDatabase = async (playerID, playerCodeName) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/addPlayer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
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


export const getPlayerByID = async (playerID) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/player/string/${playerID}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            },
        });

        console.log('Status Code:', response.status); // Log status code

        if (!response.ok) {
            throw new Error("Failed to receive player codename");
        }

        const codename = await response.text();
        console.log('Player Codename:', codename); // Log player codename
        return codename;
    } catch (error) {
        console.error("Error: getPlayerByID failed to reach /{id} endpoint");
        return null;
    }
}


export const playerDoesNotExist = async (playerID) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/player/bool/${playerID}`, {
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