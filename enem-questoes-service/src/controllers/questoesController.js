const enemApiService = require('../services/enemApiService');

const DISCIPLINAS_VALIDAS = [
  'linguagens',
  'matematica',
  'ciencias-humanas',
  'ciencias-natureza',
];

async function listarQuestoesPorAno(req, res, next) {
  try {
    const { ano } = req.params;
    const { limit = 10, offset = 0, language, disciplina } = req.query;

    const anoNum = parseInt(ano, 10);
    const anoAtual = new Date().getFullYear();
    if (isNaN(anoNum) || anoNum < 2009 || anoNum > anoAtual) {
      return res.status(400).json({
        sucesso: false,
        erro: {
          codigo: 'ANO_INVALIDO',
          mensagem: `O ano deve ser um número entre 2009 e ${anoAtual}.`,
        },
      });
    }

    const limitNum = parseInt(limit, 10);
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 90) {
      return res.status(400).json({
        sucesso: false,
        erro: {
          codigo: 'LIMIT_INVALIDO',
          mensagem: 'O parâmetro "limit" deve ser um número entre 1 e 90.',
        },
      });
    }

    const offsetNum = parseInt(offset, 10);
    if (isNaN(offsetNum) || offsetNum < 0) {
      return res.status(400).json({
        sucesso: false,
        erro: {
          codigo: 'OFFSET_INVALIDO',
          mensagem: 'O parâmetro "offset" deve ser um número maior ou igual a 0.',
        },
      });
    }

    const resultado = await enemApiService.listarQuestoes(ano, {
      limit: limitNum,
      offset: offsetNum,
      language,
    });

    let questoes = resultado.questions || [];
    if (disciplina) {
      const disciplinaLower = disciplina.toLowerCase();
      questoes = questoes.filter(
        (q) => q.discipline && q.discipline.toLowerCase() === disciplinaLower
      );
    }

    return res.status(200).json({
      sucesso: true,
      metadados: {
        ...resultado.metadata,
        filtroDisicplina: disciplina || null,
        filtroIdioma: language || null,
        totalFiltrado: questoes.length,
      },
      questoes,
    });
  } catch (error) {
    next(error);
  }
}

async function buscarQuestaoPorNumero(req, res, next) {
  try {
    const { ano, numero } = req.params;

    const anoNum = parseInt(ano, 10);
    const anoAtual = new Date().getFullYear();
    if (isNaN(anoNum) || anoNum < 2009 || anoNum > anoAtual) {
      return res.status(400).json({
        sucesso: false,
        erro: {
          codigo: 'ANO_INVALIDO',
          mensagem: `O ano deve ser um número entre 2009 e ${anoAtual}.`,
        },
      });
    }

    const numeroNum = parseInt(numero, 10);
    if (isNaN(numeroNum) || numeroNum < 1) {
      return res.status(400).json({
        sucesso: false,
        erro: {
          codigo: 'NUMERO_QUESTAO_INVALIDO',
          mensagem: 'O número da questão deve ser um inteiro positivo.',
        },
      });
    }

    const questao = await enemApiService.buscarQuestao(ano, numero);
    return res.status(200).json({
      sucesso: true,
      dados: questao,
    });
  } catch (error) {
    next(error);
  }
}

async function listarDisciplinas(req, res) {
  return res.status(200).json({
    sucesso: true,
    dados: DISCIPLINAS_VALIDAS,
  });
}

module.exports = {
  listarQuestoesPorAno,
  buscarQuestaoPorNumero,
  listarDisciplinas,
};
