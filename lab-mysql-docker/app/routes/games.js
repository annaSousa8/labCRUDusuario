const express = require('express');
const controller = require('../controllers/gamesController');

const router = express.Router();

router.get('/', controller.listarGames);
router.post('/', controller.criarGame);
router.get('/:id', controller.buscarGameId);
router.put('/:id', controller.atualizarJogo);
router.delete('/:id', controller.removerJogo);

module.exports = router;