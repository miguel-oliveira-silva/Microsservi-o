Microsserviço de Questões ENEM

Microsserviço RESTful para consulta de questões e provas do ENEM, desenvolvido com Node.js e Express.

---

1. Descrição

enem-questoes-service

Objetivo e Responsabilidades Principais

O enem-questoes-service é um microsserviço responsável por fornecer acesso simplificado às questões e provas do Exame Nacional do Ensino Médio para alunos e aplicações educacionais.

O serviço atua como um proxy inteligente entre os clientes (front-ends, apps mobile, outros serviços) e a API pública enem.dev adicionando:

Validações de entrada (ano, número de questão, paginação)
Filtro por disciplina (não disponível nativamente na API externa)
Padronização de respostas em português, com estrutura consistente
Tratamento centralizado de erros com mensagens claras
Documentação interativa via Swagger UI

Responsabilidades:
- Listar todas as provas do ENEM disponíveis
- Buscar detalhes de uma prova por ano
- Listar questões de um ano com suporte a paginação e filtros
- Retornar os detalhes completos de uma questão específica (enunciado, alternativas, gabarito)

---

2. Endpoints da API

 GET '/health'  Verifica o estado de saúde do serviço
 `GET` `/api/v1/provas`  Lista todas as provas disponíveis 
 `GET`  `/api/v1/provas/:ano`  Retorna detalhes de uma prova por ano 
 `GET`  `/api/v1/questoes/disciplinas`  Lista as disciplinas disponíveis para filtro
 `GET`  `/api/v1/questoes/:ano`  Lista questões de uma prova (paginado) 
 `GET`  `/api/v1/questoes/:ano/:numero`  Retorna os detalhes de uma questão específica
 `GET`  `/docs`  Documentação interativa Swagger UI 
 `GET`  `/docs.json`  Especificação OpenAPI em JSON 

Query Parameters — GET /api/v1/questoes/:ano

 `limit` integer 10 Número máximo de questões (1–90)
 `offset` integer 0 Índice da primeira questão
 `language` string — Idioma das questões (ingles, espanhol)
 `disciplina` string — Filtra por disciplina (matematica, linguagens, ciencias-humanas, ciencias-natureza)

---

3. Exemplos de Requisição e Resposta

Listar questões — GET /api/v1/questoes/2023?limit=2&disciplina=matematica

Requisição:
GET http://localhost:3000/api/v1/questoes/2023?limit=2&disciplina=matematica

Resposta (200 OK):
{
  "sucesso": true,
  "metadados": {
    "limit": 2,
    "offset": 0,
    "total": 180,
    "hasMore": true,
    "filtroDisicplina": "matematica",
    "filtroIdioma": null,
    "totalFiltrado": 2
  },
  "questoes": [
    {
      "title": "Questão 136 - ENEM 2023",
      "index": 136,
      "discipline": "matematica",
      "language": null,
      "year": 2023,
      "context": "Uma pesquisa acompanhou...",
      "files": [],
      "correctAlternative": "C",
      "alternativesIntroduction": "Qual é o valor de x?",
      "alternatives": [
        { "letter": "A", "text": "12", "file": null, "isCorrect": false },
        { "letter": "B", "text": "15", "file": null, "isCorrect": false },
        { "letter": "C", "text": "18", "file": null, "isCorrect": true },
        { "letter": "D", "text": "21", "file": null, "isCorrect": false },
        { "letter": "E", "text": "24", "file": null, "isCorrect": false }
      ]
    }
  ]
}

Buscar questão específica — GET /api/v1/questoes/2023/1

Requisição:
GET http://localhost:3000/api/v1/questoes/2023/1

Resposta (200 OK):
{
  "sucesso": true,
  "dados": {
    "title": "Questão 1 - ENEM 2023",
    "index": 1,
    "discipline": "linguagens",
    "language": null,
    "year": 2023,
    "context": "Leia o texto a seguir...",
    "files": ["https://enem.dev/2023/questions/1/imagem.png"],
    "correctAlternative": "B",
    "alternativesIntroduction": "Assinale a alternativa correta.",
    "alternatives": [
      { "letter": "A", "text": "Opção A", "file": null, "isCorrect": false },
      { "letter": "B", "text": "Opção B", "file": null, "isCorrect": true },
      { "letter": "C", "text": "Opção C", "file": null, "isCorrect": false },
      { "letter": "D", "text": "Opção D", "file": null, "isCorrect": false },
      { "letter": "E", "text": "Opção E", "file": null, "isCorrect": false }
    ]
  }
}

Erro — Ano inválido

Requisição:
GET http://localhost:3000/api/v1/questoes/1990

Resposta (400 Bad Request):
{
  "sucesso": false,
  "erro": {
    "codigo": "ANO_INVALIDO",
    "mensagem": "O ano deve ser um número entre 2009 e 2025."
  }
}


4. Dependências Externas

APIs Externas

 API ENEM  https://api.enem.dev/v1  Fonte de dados de provas e questões do ENEM (open-source, comunidade brasileira, licença GNU GPL-2.0)

Bibliotecas de Terceiros (npm)

 `express`  ^4.19.2  Framework web para criação das rotas HTTP
 `axios`  ^1.7.2  Cliente HTTP para chamadas à API ENEM
 `cors`  ^2.8.5  Habilitação de Cross-Origin Resource Sharing
 `dotenv`  ^16.4.5  Carregamento de variáveis de ambiente
 `swagger-jsdoc`  ^6.2.8  Geração da especificação OpenAPI a partir de JSDoc
 `swagger-ui-express`  ^5.0.1  Interface visual Swagger para exploração da API
 `nodemon`  ^3.1.4  Reinicialização automática em desenvolvimento

Banco de Dados

Nenhum. O serviço é stateless — não persiste dados localmente.

Fila / Broker de Mensagens

Não utilizado. O serviço opera de forma síncrona via HTTP REST.


5. Responsável pelo Serviço

 Responsável  Miguel (Estudante)
 Disciplina  Microsserviços
 Instituição  —
 Contato  —


6. Procedimentos Básicos de Operação

Como Executar Localmente

Pré-requisitos: Node.js v18+ e npm instalados.

1. Clone o repositório e acesse a pasta do serviço
cd enem-questoes-service

2. Instale as dependências
npm install

3. Configure as variáveis de ambiente
cp .env.example .env

4. Execute em modo desenvolvimento (com hot reload)
npm run dev

OU execute em modo produção
npm start

O serviço estará disponível em: http://localhost:3000

Como Verificar Logs

Os logs são exibidos diretamente no terminal no formato:

GET /api/v1/questoes/2023?limit=5
ERRO: Tempo de resposta da API ENEM esgotado

Em produção, redirecione a saída para um arquivo:
npm start >> logs/app.log 2>&1

Endpoint de Health Check

GET http://localhost:3000/health

Resposta esperada:
{
  "status": "ok",
  "servico": "enem-questoes-service",
  "versao": "1.0.0",
  "timestamp": "2024-01-15T14:30:00.000Z",
  "uptime": 3600,
  "ambiente": "development",
  "apiExterna": "https://api.enem.dev/v1"
}

Como Reiniciar o Serviço

Desenvolvimento (nodemon reinicia automaticamente ao salvar arquivos)
npm run dev

Produção — parar e reiniciar manualmente
Ctrl+C para parar, depois:
npm start

Com PM2 (recomendado para produção)
pm2 restart enem-questoes-service


7. Regras de Negócio

 RN01 — Validação do ano  O ano deve ser um inteiro entre 2009 (primeiro ano disponível na API ENEM) e o ano corrente. Anos fora deste intervalo retornam HTTP 400. 
 RN02 — Limit máximo  O parâmetro limit aceita valores entre 1 e 90. Valores fora desse intervalo retornam HTTP 400. O limite de 90 existe para não sobrecarregar a API externa. 
 RN03 — Offset não negativo  O parâmetro offset deve ser >= 0. Valores negativos retornam HTTP 400. 
 RN04 — Número da questão positivo  O número da questão deve ser um inteiro positivo (>= 1). Valores inválidos retornam HTTP 400. 
 RN05 — Filtro por disciplina  O filtro por disciplina é aplicado localmente após receber os dados da API ENEM, pois a API externa não oferece este filtro nativamente. 
 RN06 — Propagação de erros externos  Erros retornados pela API ENEM são propagados com o código HTTP original e uma mensagem amigável em português. 
 RN07 — Timeout de 10 segundos  Requisições à API ENEM têm timeout de 10 segundos configurável via variável de ambiente ENEM_API_TIMEOUT. 
 RN08 — Resposta padronizada  Todas as respostas seguem o envelope { sucesso: boolean, dados/questoes/metadados/erro }. 


8. Eventos Publicados ou Consumidos

Este serviço não publica nem consome eventos assíncronos. Opera exclusivamente de forma síncrona via HTTP REST. Não há integração com filas de mensagens (RabbitMQ, Kafka, SQS, etc.).


9. Métricas Monitoradas

As métricas abaixo são recomendadas para monitoramento em produção:

 Taxa de disponibilidade  Percentual de tempo em que o /health responde com status ok (Uptime Robot, Pingdom)
 Latência das requisições  Tempo médio de resposta das rotas p50, p95, p99 (Prometheus + Grafana)
 Taxa de erros (4xx/5xx)  Percentual de respostas com erro em relação ao total (Prometheus + Grafana)
 Disponibilidade da API externa  Monitoramento de falhas de conexão com api.enem.dev (Logs + Alertas)
 Tempo de uptime  Tempo desde o último reinício campo uptime no health check (/health endpoint)
 Número de requisições por minuto  Volume de tráfego recebido (Logs de acesso)


10. ADR Relacionado (Decisão Arquitetural)

ADR-001 — Uso do Padrão Proxy/Anti-Corruption Layer

Contexto:  
O serviço precisa consumir dados de uma API externa de terceiros (api.enem.dev). As respostas da API externa estão em inglês e podem mudar sem aviso.

Decisão:  
Adotar o padrão Proxy com Anti-Corruption Layer (ACL): o microsserviço traduz e valida os dados entre a API externa e os clientes internos.

Consequências:
- Clientes internos são isolados de mudanças na API externa
- Respostas são padronizadas em português
- Validações de entrada centralizadas
- Adiciona uma camada extra de latência de rede


ADR-002 — Node.js + Express como Stack

Contexto:  
Necessidade de criar rapidamente um serviço HTTP leve para integração com API externa.

Decisão:  
Usar Node.js com Express, por ser amplamente adotado, ter ecossistema maduro e ser adequado para serviços I/O-bound como este (chamadas HTTP à API externa).

Consequências:
- Desenvolvimento ágil com poucos arquivos
- Excelente para operações assíncronas e I/O-bound
- Não é ideal para operações CPU-intensivas