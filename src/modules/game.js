const API = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

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

    return data.result.slice(14, 35);
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

const getScores = async (ID) => {
  try {
    const response = await fetch(`${API}/games/${ID}/scores`, {
      method: 'GET',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to get the scores of the game.');
    }

    return data;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

const setScore = async (ID, newName, newScore) => {
  try {
    const response = await fetch(`${API}/games/${ID}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: newName, score: newScore }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create a new score.');
    }

    return data;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

export { createGame, getScores, setScore };
