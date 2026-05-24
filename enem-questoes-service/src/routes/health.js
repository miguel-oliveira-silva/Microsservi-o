const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    servico: 'enem-questoes-service',
    versao: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    ambiente: process.env.NODE_ENV || 'development',
    apiExterna: process.env.ENEM_API_BASE_URL || 'https://api.enem.dev/v1',
  });
});

module.exports = router;
