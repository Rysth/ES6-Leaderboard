const API = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

const gameData = 'My Awesome Game';

const createGame = async (gameName) => {
  try {
    const response = await fetch(`${API}/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: gameName }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create the game.');
    }

    console.log(data);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

createGame(gameData);
