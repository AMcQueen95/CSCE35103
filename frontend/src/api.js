const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 

export const addPlayerToDatabase = async (playerId, playerCodeName) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/player`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ codename: playerId, playerCodeName}), 
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