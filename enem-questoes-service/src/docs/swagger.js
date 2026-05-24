const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Microsserviço de Questões ENEM',
      version: '1.0.0',
      description: `
## Sobre o serviço

Microsserviço RESTful que consome a [API pública ENEM (enem.dev)](https://enem.dev) e expõe
endpoints simplificados para que alunos possam consultar questões e provas do ENEM.

## Dependência externa

Todos os dados são obtidos de **https://api.enem.dev/v1** — uma API open-source criada
pela comunidade brasileira, licenciada sob GNU GPL-2.0.

## Limites de uso

A API ENEM externa possui limite de requisições por minuto. Em caso de erro 429 (Too Many Requests),
aguarde alguns segundos antes de tentar novamente.
      `.trim(),
      contact: {
        name: 'Repositório do Projeto',
        url: 'https://github.com/yunger7/enem-api',
      },
      license: {
        name: 'MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      schemas: {
        Alternativa: {
          type: 'object',
          properties: {
            letter: {
              type: 'string',
              enum: ['A', 'B', 'C', 'D', 'E'],
              description: 'Letra da alternativa',
              example: 'A',
            },
            text: {
              type: 'string',
              nullable: true,
              description: 'Texto da alternativa',
              example: 'Lorem ipsum dolor sit amet.',
            },
            file: {
              type: 'string',
              nullable: true,
              description: 'URL de imagem da alternativa (quando aplicável)',
              example: null,
            },
            isCorrect: {
              type: 'boolean',
              description: 'Indica se esta é a alternativa correta',
              example: true,
            },
          },
        },
        Questao: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Título da questão',
              example: 'Questão 1 - ENEM 2023',
            },
            index: {
              type: 'integer',
              description: 'Número da questão na prova',
              example: 1,
            },
            discipline: {
              type: 'string',
              nullable: true,
              description: 'Disciplina da questão',
              example: 'linguagens',
            },
            language: {
              type: 'string',
              nullable: true,
              description: 'Idioma da questão',
              example: null,
            },
            year: {
              type: 'integer',
              description: 'Ano da prova',
              example: 2023,
            },
            context: {
              type: 'string',
              nullable: true,
              description: 'Contexto/enunciado da questão em Markdown',
              example: 'Leia o texto a seguir e responda...',
            },
            files: {
              type: 'array',
              items: { type: 'string' },
              description: 'URLs de imagens da questão',
              example: [],
            },
            correctAlternative: {
              type: 'string',
              enum: ['A', 'B', 'C', 'D', 'E'],
              description: 'Letra da alternativa correta',
              example: 'B',
            },
            alternativesIntroduction: {
              type: 'string',
              nullable: true,
              description: 'Texto introdutório das alternativas',
              example: 'Assinale a alternativa correta.',
            },
            alternatives: {
              type: 'array',
              items: { $ref: '#/components/schemas/Alternativa' },
              description: 'Lista de alternativas',
            },
          },
        },
        Erro: {
          type: 'object',
          properties: {
            sucesso: {
              type: 'boolean',
              example: false,
            },
            erro: {
              type: 'object',
              properties: {
                codigo: { type: 'string', example: 'ANO_INVALIDO' },
                mensagem: { type: 'string', example: 'O ano deve ser um número entre 2009 e 2025.' },
              },
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Health Check',
        description: 'Monitoramento e disponibilidade do serviço',
      },
      {
        name: 'Provas',
        description: 'Consulta de provas do ENEM por ano',
      },
      {
        name: 'Questões',
        description: 'Consulta e filtragem de questões do ENEM',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
