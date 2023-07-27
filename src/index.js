// index.js
import { createGame, getScores, setScore } from './modules/game';
import './styles.css';

const getGameIdFromStorage = () => localStorage.getItem('gameId');

const setGameIdInStorage = (id) => {
  localStorage.setItem('gameId', id);
};

const initGame = async () => {
  let gameId = getGameIdFromStorage();

  if (!gameId) {
    gameId = await createGame('RysthCraft');
    setGameIdInStorage(gameId);
  }

  return gameId;
};

const updateDashboard = async () => {
  const ID = getGameIdFromStorage();
  if (ID) {
    try {
      const { result } = await getScores(ID);
      result.sort((first, second) => second.score - first.score);
      if (result.length >= 1) {
        const userList = document.querySelector('#user-list');
        userList.innerHTML = result
          .map((element, index) => {
            const value = index + 1;
            const listItemClass = value % 2 === 0 && index > 0
              ? 'list-item list-item-accent'
              : 'list-item';
            return `<li class="${listItemClass}">${element.user}: ${element.score}</li>`;
          })
          .join('');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

const btnRefresh = document.querySelector('#btn-refresh');
const btnSubmit = document.querySelector('#btn-submit');
const form = document.querySelector('#form');

btnRefresh.addEventListener('click', async () => {
  updateDashboard(); // Call the function to update the dashboard when the refresh button is clicked
});

btnSubmit.addEventListener('click', async () => {
  const name = document.querySelector('#name').value;
  const score = document.querySelector('#score').value;
  if (name !== '' && score !== '') {
    const ID = getGameIdFromStorage();
    if (ID) {
      await setScore(ID, name, score);
      form.reset();
      updateDashboard(); // Call the function to update the dashboard after submitting a new score
    }
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
});

// Call the function to initialize the game and update the dashboard when the page loads
(async () => {
  await initGame();
  updateDashboard();
})();
