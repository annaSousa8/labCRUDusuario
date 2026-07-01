const db = require("../db");

async function listarJogos() {
  const [rows] = await db.query(`
    SELECT
      g.id,
      g.team_A_id,
      g.team_B_id,
      ta.name AS team_A_name,
      tb.name AS team_B_name
    FROM game g
    INNER JOIN team ta
      ON g.team_A_id = ta.id
    INNER JOIN team tb
      ON g.team_B_id = tb.id
    ORDER BY g.id
  `);

  return rows;
}

async function buscarJogoId(id) {
  const [rows] = await db.query(`
    SELECT
      g.id,
      g.team_A_id,
      g.team_B_id,
      ta.name AS team_A_name,
      tb.name AS team_B_name
    FROM game g
    INNER JOIN team ta
      ON g.team_A_id = ta.id
    INNER JOIN team tb
      ON g.team_B_id = tb.id
    WHERE g.id = ?
  `, [id]);

  return rows[0] || null;
}

async function criarJogo({ team_A, team_B }) {
  const [result] = await db.query(
    `INSERT INTO game (team_A_id, team_B_id)
     VALUES (?, ?)`,
    [team_A, team_B]
  );

  return buscarJogoId(result.insertId);
}

async function atualizarJogo(id, { team_A, team_B }) {
  const [result] = await db.query(
    `UPDATE game
     SET team_A_id = ?, team_B_id = ?
     WHERE id = ?`,
    [team_A, team_B, id]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return buscarJogoId(id);
}

async function removerJogo(id) {
  const [result] = await db.query(
    `DELETE FROM game WHERE id = ?`,
    [id]
  );

  return result.affectedRows > 0;
}

module.exports = {
  listarJogos,
  buscarJogoId,
  criarJogo,
  atualizarJogo,
  removerJogo
};