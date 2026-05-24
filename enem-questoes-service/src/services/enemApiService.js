const axios = require('axios');

const enemClient = axios.create({
  baseURL: process.env.ENEM_API_BASE_URL || 'https://api.enem.dev/v1',
  timeout: parseInt(process.env.ENEM_API_TIMEOUT, 10) || 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

enemClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const mensagem = data?.error?.message || 'Erro na API ENEM';
      const err = new Error(mensagem);
      err.status = status;
      err.origem = 'API_ENEM';
      err.detalhe = data?.error || null;
      return Promise.reject(err);
    }

    if (error.code === 'ECONNABORTED') {
      const err = new Error('Tempo de resposta da API ENEM esgotado');
      err.status = 504;
      err.origem = 'API_ENEM';
      return Promise.reject(err);
    }

    const err = new Error('Falha ao conectar com a API ENEM');
    err.status = 503;
    err.origem = 'API_ENEM';
    return Promise.reject(err);
  }
);

async function listarProvas() {
  const { data } = await enemClient.get('/exams');
  return data;
}

async function buscarProva(ano) {
  const { data } = await enemClient.get(`/exams/${ano}`);
  return data;
}

async function listarQuestoes(ano, { limit = 10, offset = 0, language } = {}) {
  const params = { limit, offset };
  if (language) params.language = language;

  const { data } = await enemClient.get(`/exams/${ano}/questions`, { params });
  return data;
}

async function buscarQuestao(ano, numero) {
  const { data } = await enemClient.get(`/exams/${ano}/questions/${numero}`);
  return data;
}

module.exports = {
  listarProvas,
  buscarProva,
  listarQuestoes,
  buscarQuestao,
};
