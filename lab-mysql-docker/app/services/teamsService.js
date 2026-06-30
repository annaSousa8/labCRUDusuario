const db = require("../db");

async function listarTimes() {
  const [rows] = await db.query(
    "SELECT id, name FROM team ORDER BY name"
  );

  return rows;
}

async function buscarTimeId(id) {
  const [rows] = await db.query(
    "SELECT id, name FROM team WHERE id = ?",
    [id]
  );

  return rows[0] || null;
}

async function criarTime(name) {
  const [result] = await db.query(
    "INSERT INTO team (name) VALUES (?)",
    [name]
  );

  return buscarTimeId(result.insertId);
}

async function atualizarTime(id, name) {
  const [result] = await db.query(
    "UPDATE team SET name = ? WHERE id = ?",
    [name, id]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return buscarTimeId(id);
}

async function removerTime(id) {
  const [result] = await db.query(
    "DELETE FROM team WHERE id = ?",
    [id]
  );

  return result.affectedRows > 0;
}

module.exports = {
  listarTimes,
  buscarTimeId,
  criarTime,
  atualizarTime,
  removerTime
};