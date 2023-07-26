import { createGame, getScores, setScore } from './modules/game';
import './styles.css';

const ID = await createGame('RysthCraft');
const btnRefresh = document.querySelector('#btn-refresh');
const btnSubmit = document.querySelector('#btn-submit');
const form = document.querySelector('#form');

btnRefresh.addEventListener('click', async () => {
  const { result } = await getScores(ID);
  if (result.length >= 1) {
    const userList = document.querySelector('#user-list');

    userList.innerHTML = result
      .map((element, index) => {
        const value = index + 1;
        const listItemClass =
          value % 2 === 0 && index > 0 ? 'list-item list-item-accent' : 'list-item';
        return `<li class="${listItemClass}">${element.user}: ${element.score}</li>`;
      })
      .join('');
  }
});

btnSubmit.addEventListener('click', async () => {
  const name = document.querySelector('#name').value;
  const score = document.querySelector('#score').value;
  if (name !== '' && score !== '') {
    await setScore(ID, name, score);
    form.reset();
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
});
