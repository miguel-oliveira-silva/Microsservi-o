require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const healthRoutes = require('./routes/health');
const provasRoutes = require('./routes/provas');
const questoesRoutes = require('./routes/questoes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'API Questões ENEM',
    customCss: '.swagger-ui .topbar { background-color: #1a1a2e; }',
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  })
);

app.get('/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/health', healthRoutes);
app.use('/api/v1/provas', provasRoutes);
app.use('/api/v1/questoes', questoesRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    servico: 'enem-questoes-service',
    descricao: 'Microsserviço de questões ENEM para alunos',
    versao: '1.0.0',
    documentacao: `http://localhost:${PORT}/docs`,
    healthCheck: `http://localhost:${PORT}/health`,
    endpoints: {
      provas: `http://localhost:${PORT}/api/v1/provas`,
      questoes: `http://localhost:${PORT}/api/v1/questoes/{ano}`,
    },
  });
});

app.use((req, res) => {
  res.status(404).json({
    sucesso: false,
    erro: {
      codigo: 'ROTA_NAO_ENCONTRADA',
      mensagem: `A rota ${req.method} ${req.originalUrl} não existe neste serviço.`,
      documentacao: `http://localhost:${PORT}/docs`,
    },
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║      Microsserviço de Questões ENEM — v1.0.0     ║');
  console.log('╠══════════════════════════════════════════════════╣');
  console.log(`║  Servidor:     http://localhost:${PORT}              ║`);
  console.log(`║  Documentação: http://localhost:${PORT}/docs         ║`);
  console.log(`║  Health Check: http://localhost:${PORT}/health       ║`);
  console.log(`║  Ambiente:     ${(process.env.NODE_ENV || 'development').padEnd(34)}║`);
  console.log('╚══════════════════════════════════════════════════╝');
});

module.exports = app;
