[Português](README.md) · **English**

# Calendar Backend

Academic project: Project 1 for Web Back-End Programming

Student: Felipe de Almeida Bueno

## Theme

A calendar for users, categories, events, and notes.

## Technologies

- JavaScript and Node.js
- Express
- Sequelize and PostgreSQL
- Mongoose and MongoDB

## Installation

1. Create the `web2_db` database in PostgreSQL.
2. Keep PostgreSQL and MongoDB running locally.
3. Run `npm install` in the project directory.

## Running

Run `npm start`. The application will be available at `http://localhost:8081`.

## Databases

- PostgreSQL: `web2_db`, with user `postgres`, password `1234`, and host `localhost`.
- MongoDB: `mongodb://localhost/web2_db`.

## Features

- CRUD operations for users, categories, and events in PostgreSQL.
- Relationships from Usuario and Categoria to Evento.
- Event queries by title or category, with ordering by title.
- CRUD operations for notes in MongoDB.
- Required field validation, error handling, and an error log file.

## Routes

| Method | Route |
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

For edit and delete routes, the `id` field must be sent in the request body.

## Data distribution

Usuario, Categoria, and Evento are stored in PostgreSQL because they have a defined structure and relationships with one another.

Anotacao is stored in MongoDB because it represents document-oriented information linked to Evento.
