const express = require('express');
const router = express.Router();
const questoesController = require('../controllers/questoesController');

router.get('/disciplinas', questoesController.listarDisciplinas);

router.get('/:ano', questoesController.listarQuestoesPorAno);

router.get('/:ano/:numero', questoesController.buscarQuestaoPorNumero);

module.exports = router;
