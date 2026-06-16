const express = require('express');
const controller = require('../controllers/usuariosController');

const router = express.Router();

router.get('/', controller.listarGames);
router.post('/', controller.criarGame);
router.get('/:id', controller.buscarGameId);

module.exports = router;