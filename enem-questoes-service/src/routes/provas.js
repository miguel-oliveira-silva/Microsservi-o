const express = require('express');
const router = express.Router();
const provasController = require('../controllers/provasController');

router.get('/', provasController.listarProvas);

router.get('/:ano', provasController.buscarProvaPorAno);

module.exports = router;
