const enemApiService = require('../services/enemApiService');

async function listarProvas(req, res, next) {
  try {
    const provas = await enemApiService.listarProvas();
    return res.status(200).json({
      sucesso: true,
      dados: provas,
    });
  } catch (error) {
    next(error);
  }
}

async function buscarProvaPorAno(req, res, next) {
  try {
    const { ano } = req.params;
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

    const prova = await enemApiService.buscarProva(ano);
    return res.status(200).json({
      sucesso: true,
      dados: prova,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listarProvas,
  buscarProvaPorAno,
};
