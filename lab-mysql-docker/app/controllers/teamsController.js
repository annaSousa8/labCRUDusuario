const service = require("../services/teamsService");

async function listarTimes(req, res) {
  try {
    const times = await service.listarTimes();
    res.json(times);
  } catch (error) {
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

async function buscarTimeId(req, res) {
  try {
    const time = await service.buscarTimeId(req.params.id);

    if (!time) {
      return res.status(404).json({
        erro: "Time não encontrado"
      });
    }

    res.json(time);
  } catch (error) {
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

async function criarTime(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        erro: "Nome é obrigatório"
      });
    }

    const time = await service.criarTime(name);

    res.status(201).json(time);
  } catch (error) {
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

async function atualizarTime(req, res) {
  try {
    const { name } = req.body;

    const time = await service.atualizarTime(
      req.params.id,
      name
    );

    if (!time) {
      return res.status(404).json({
        erro: "Time não encontrado"
      });
    }

    res.json(time);
  } catch (error) {
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

async function removerTime(req, res) {
  try {
    const removido = await service.removerTime(req.params.id);

    if (!removido) {
      return res.status(404).json({
        erro: "Time não encontrado"
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

module.exports = {
  listarTimes,
  buscarTimeId,
  criarTime,
  atualizarTime,
  removerTime
};