import { createGame, getScores } from './modules/game';
import './styles.css';

const ID = await createGame('My Awesome Game');
const btnRefresh = document.querySelector('#btn-refresh');

btnRefresh.addEventListener('click', async () => {
  const { result } = await getScores(ID);
});
