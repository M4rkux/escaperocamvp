import express from 'express';
import cors from 'cors';
import { DB } from './databaseutil.js';
import { Highscore } from './highscore.js';

const app = express();
app.use(cors());
app.use(express.json());

const databaseUtil = new DB();

app.get('/', async (req, res) => {
  const highscores = await databaseUtil.list();
  res.json(highscores);
});

app.post('/', async (req, res) => {
  const { nick, moves, time } = req.body;
  const highscore = new Highscore(nick, moves, time);
  await databaseUtil.insert(highscore);
  res.send('ok');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
