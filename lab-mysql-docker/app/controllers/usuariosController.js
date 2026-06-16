const service = require('../services/usuariosService');

async function listar(req, res) {
  try {
    const usuarios = await service.listar();
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

async function listarGames(req, res) {
  try {
    const games = await service.listarGames();
    res.json(games);
  } catch (error) {
    console.error('Erro ao listar jogos:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

async function buscarPorId(req, res) {
  try {
    const usuario = await service.buscarPorId(req.params.id);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuario nao encontrado' });
    }
    return res.json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

async function buscarGameId(req, res) {
  try {
    const games = await service.buscarGameId(req.params.id);
    if (!games) {
      return res.status(404).json({ erro: 'Jogo nao encontrado' });
    }
    return res.json(games);
  } catch (error) {
    console.error('Erro ao buscar jogo:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

async function criar(req, res) {
  try {
    const { nome, email } = req.body;
    if (!nome || !email) {
      return res.status(400).json({ erro: 'Nome e email sao obrigatorios' });
    }
    const usuario = await service.criar({ nome, email });
    return res.status(201).json(usuario);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

async function criarGame(req, res) {
  try {
    const { team_A, team_B } = req.body;
    if (!team_A || !team_B) {
      return res.status(400).json({ erro: 'Time A e Time B sao obrigatorios' });
    }
    const game = await service.criarGame({ team_A, team_B });
    return res.status(201).json(game);
  } catch (error) {
    console.error('Erro ao criar jogo:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

async function atualizar(req, res) {
  try {
    const { nome, email } = req.body;
    if (!nome || !email) {
      return res.status(400).json({ erro: 'Nome e email sao obrigatorios' });
    }
    const usuario = await service.atualizar(req.params.id, { nome, email });
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuario nao encontrado' });
    }
    return res.json(usuario);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

async function remover(req, res) {
  try {
    const removido = await service.remover(req.params.id);
    if (!removido) {
      return res.status(404).json({ erro: 'Usuario nao encontrado' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao remover usuário:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
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