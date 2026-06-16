const db = require('../db');

async function listar() {
  const [rows] = await db.query('SELECT id, nome, email FROM usuarios ORDER BY id DESC');
  return rows;
}

async function listarGames() {
  const [rows] = await db.query('SELECT id, team_A_id, team_B_id, HCC_A, HCC_B, first_time_id, second_time_id FROM game ORDER BY id DESC');
  return rows;
}

async function buscarPorId(id) {
  const [rows] = await db.query(
    'SELECT id, nome, email FROM usuarios WHERE id = ?',
    [id]
  );

  return rows[0] || null;
}

async function buscarGameId(id) {
  const [rows] = await db.query(
    'SELECT id, team_A_id, team_B_id, HCC_A, HCC_B, first_time_id, second_time_id FROM game WHERE id = ?',
    [id]
  );

  return rows[0] || null;
}

async function criar({ nome, email }) {
  const [result] = await db.query(
    'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
    [nome, email]
  );

  return buscarPorId(result.insertId);
}

async function criarGame({team_A, team_B}) {
  const [ result ] = await db.query(
    'INSERT INTO game (team_A_id, team_B_id) VALUES (?, ?)',
    [team_A, team_B]
  );

  return result.insertId;
}

async function atualizar(id, { nome, email }) {
  const [result] = await db.query(
    'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
    [nome, email, id]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return buscarPorId(id);
}

async function remover(id) {
  const [result] = await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover,
  listarGames,
  criarGame, 
  buscarGameId
};