const express = require('express');
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const gamesRoutes = require('./routes/games');
const teamsRoutes = require('./routes/teams');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'segredo-lab',
    resave: false,
    saveUninitialized: false
  })
);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/games', gamesRoutes);
app.use('/teams', teamsRoutes);

app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});