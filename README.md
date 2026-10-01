**Português** · [English](README.en.md)

# Calendar Backend

Projeto acadêmico: Projeto 1 de Programação Web Back-End

Integrante: Felipe de Almeida Bueno

## Vídeo explicativo

[![Assista ao vídeo explicativo do Projeto 1](https://img.youtube.com/vi/PHjwo0P1thA/hqdefault.jpg)](https://www.youtube.com/watch?v=PHjwo0P1thA)

[Assistir ao vídeo no YouTube](https://www.youtube.com/watch?v=PHjwo0P1thA)

## Temática

Agenda de usuários, categorias, eventos e anotações.

## Tecnologias

- JavaScript e Node.js
- Express
- Sequelize e PostgreSQL
- Mongoose e MongoDB

## Instalação

1. Crie no PostgreSQL o banco `web2_db`.
2. Mantenha PostgreSQL e MongoDB em execução localmente.
3. Execute `npm install` na pasta do projeto.

## Execução

Execute `npm start`. A aplicação ficará disponível em `http://localhost:8081`.

## Bancos utilizados

- PostgreSQL: `web2_db`, com usuário `postgres`, senha `1234` e host `localhost`.
- MongoDB: `mongodb://localhost/web2_db`.

## Funcionalidades

- CRUD de usuários, categorias e eventos no PostgreSQL.
- Relacionamentos de Usuário e Categoria com Evento.
- Consulta de eventos por título ou categoria e ordenação por título.
- CRUD de anotações no MongoDB.
- Validação de campos obrigatórios, tratamento de erros e arquivo de log.

## Rotas

| Método | Rota |
|---|---|
| GET | `/usuarios` |
| POST | `/cadastrarUsuario` |
| POST | `/editarUsuario` |
| POST | `/excluirUsuario` |
| GET | `/categorias` |
| POST | `/cadastrarCategoria` |
| POST | `/editarCategoria` |
| POST | `/excluirCategoria` |
| GET | `/eventos` |
| GET | `/eventos?titulo=reuniao` |
| GET | `/eventos?categoriaId=1` |
| POST | `/cadastrarEvento` |
| POST | `/editarEvento` |
| POST | `/excluirEvento` |
| GET | `/anotacoes` |
| POST | `/cadastrarAnotacao` |
| POST | `/editarAnotacao` |
| POST | `/excluirAnotacao` |

Nas rotas de edição e exclusão, o campo `id` deve ser enviado no corpo da requisição.

## Divisão dos dados

Usuario, Categoria e Evento ficam no PostgreSQL porque possuem estrutura definida e relacionamentos entre si.

Anotacao fica no MongoDB porque representa uma informação documental vinculada ao Evento.
