function errorHandler(err, req, res, next) {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ERRO: ${err.message}`);
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  if (err.origem === 'API_ENEM') {
    const statusCode = err.status || 502;
    return res.status(statusCode).json({
      sucesso: false,
      erro: {
        codigo: 'ERRO_API_EXTERNA',
        mensagem: err.message,
        origem: 'API ENEM (api.enem.dev)',
        detalhe: err.detalhe || null,
        documentacao: 'https://docs.enem.dev/errors',
      },
    });
  }

  if (err.status === 400) {
    return res.status(400).json({
      sucesso: false,
      erro: {
        codigo: 'REQUISICAO_INVALIDA',
        mensagem: err.message,
      },
    });
  }

  const statusCode = err.status || 500;
  return res.status(statusCode).json({
    sucesso: false,
    erro: {
      codigo: 'ERRO_INTERNO',
      mensagem:
        process.env.NODE_ENV === 'production'
          ? 'Ocorreu um erro interno. Tente novamente mais tarde.'
          : err.message,
    },
  });
}

module.exports = errorHandler;
