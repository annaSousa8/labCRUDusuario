const express = require('express');
const controller = require('../controllers/usuariosController');

const router = express.Router();

router.get('/', controller.listarGames);
router.post('/', controller.criarGame);

module.exports = router;