const service = require("../services/gamesService");

async function listarGames(req, res) {
  try {
    const games = await service.listarJogos();
    res.json(games);
  } catch (error) {
    console.error("Erro ao listar jogos:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

async function buscarGameId(req, res) {
  try {
    const game = await service.buscarJogoId(req.params.id);

    if (!game) {
      return res.status(404).json({
        erro: "Jogo não encontrado"
      });
    }

    res.json(game);
  } catch (error) {
    console.error("Erro ao buscar jogo:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

async function criarGame(req, res) {
  try {
    const { team_A, team_B } = req.body;

    if (!team_A || !team_B) {
      return res.status(400).json({
        erro: "Time A e Time B são obrigatórios"
      });
    }

    const game = await service.criarJogo({
      team_A,
      team_B
    });

    res.status(201).json(game);
  } catch (error) {
    console.error("Erro ao criar jogo:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

async function atualizarJogo(req, res) {
  try {
    const { team_A, team_B } = req.body;

    if (!team_A || !team_B) {
      return res.status(400).json({
        erro: "Time A e Time B são obrigatórios"
      });
    }

    const game = await service.atualizarJogo(
      req.params.id,
      {
        team_A,
        team_B
      }
    );

    if (!game) {
      return res.status(404).json({
        erro: "Jogo não encontrado"
      });
    }

    res.json(game);
  } catch (error) {
    console.error("Erro ao atualizar jogo:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

async function removerJogo(req, res) {
  try {
    const removido = await service.removerJogo(req.params.id);

    if (!removido) {
      return res.status(404).json({
        erro: "Jogo não encontrado"
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Erro ao remover jogo:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

module.exports = {
  listarGames,
  buscarGameId,
  criarGame,
  atualizarJogo,
  removerJogo
};