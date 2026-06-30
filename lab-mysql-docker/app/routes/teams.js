const express = require('express');
const controller = require('../controllers/teamsController');

const router = express.Router();

router.get('/', controller.listarTimes);
router.post('/', controller.criarTime);
router.get('/:id', controller.buscarTimeId);
router.put('/:id', controller.atualizarTime);
router.delete('/:id', controller.removerTime);

module.exports = router;