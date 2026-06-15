const express = require('express');
const cors = require('cors');
const session = require('express-session');
const usuariosRoutes = require('./routes/usuarios');
const authRoutes = require('./routes/auth');
const gamesRoutes = require('./routes/games');

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
app.use('/usuarios', usuariosRoutes);
app.use('/games', gamesRoutes);

app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});