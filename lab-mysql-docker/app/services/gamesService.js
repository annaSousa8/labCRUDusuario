const db = require('../db');

async function listarGames() {
  const [rows] = await db.query('SELECT id, team_A_id, team_B_id, HCC_A, HCC_B, first_time_id, second_time_id FROM game ORDER BY id DESC');
  return rows;
}

async function buscarGameId(id) {
  const [rows] = await db.query(
    'SELECT id, team_A_id, team_B_id, HCC_A, HCC_B, first_time_id, second_time_id FROM game WHERE id = ?',
    [id]
  );

  return rows[0] || null;
}

async function criarGame({team_A, team_B}) {
  const [ result ] = await db.query(
    'INSERT INTO game (team_A_id, team_B_id) VALUES (?, ?)',
    [team_A, team_B]
  );

  return result.insertId;
}

async function atualizarJogo(id, { team_A, team_B }) {
  const [result] = await db.query(
    'UPDATE game SET team_A_id = ?, team_B_id = ? WHERE id = ?',
    [team_A, team_B, id]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return buscarGameId(id);
}

async function removerJogo(id) {
  const [result] = await db.query('DELETE FROM game WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  listarGames,
  criarGame, 
  buscarGameId,
  atualizarJogo,
  removerJogo
};