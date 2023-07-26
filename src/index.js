import { createGame, getScores, setScore } from './modules/game';
import './styles.css';

const ID = await createGame('My Awesome Game');
const btnRefresh = document.querySelector('#btn-refresh');
const btnSubmit = document.querySelector('#btn-submit');
const form = document.querySelector('#form');

btnRefresh.addEventListener('click', async () => {
  const { result } = await getScores(ID);
  result.forEach((element) =>
    console.log(`User: ${element.user}, Score: ${element.score}`)
  );
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
