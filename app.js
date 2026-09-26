const express = require('express');
const mongoose = require('mongoose');
const { Op } = require('sequelize');
const db = require('./config/db_sequelize');
const dbMongoose = require('./config/db_mongoose');
const Anotacao = require('./models/anotacao');
const Logger = require('./logger');

const app = express();
const logger = new Logger();

app.use(express.urlencoded({ extended: true }));

db.sequelize.sync().then(() => {
  console.log('PostgreSQL conectado');
}).catch((erro) => {
  logger.registrarErro(erro);
  console.log('Erro ao conectar ao PostgreSQL');
});

mongoose.connect(dbMongoose.connection).then(() => {
  console.log('MongoDB conectado');
}).catch((erro) => {
  logger.registrarErro(erro);
  console.log('Erro ao conectar ao MongoDB');
});

app.get('/usuarios', async function (req, res) {
  try {
    const usuarios = await db.Usuario.findAll();
    res.send(usuarios);
  } catch (erro) {
    logger.registrarErro(erro);
    res.status(500).send('Erro ao consultar usuários');
  }
});

app.post('/cadastrarUsuario', async function (req, res) {
  if (!req.body.nome || !req.body.email) {
    return res.status(400).send('Nome e email são obrigatórios');
  }

  try {
    const usuario = await db.Usuario.create({
      nome: req.body.nome,
      email: req.body.email
    });
    res.send(usuario);
  } catch (erro) {
    logger.registrarErro(erro);
    res.status(500).send('Erro ao cadastrar usuário');
  }
});

app.post('/editarUsuario', async function (req, res) {
  if (!req.body.id || !req.body.nome || !req.body.email) {
    return res.status(400).send('Id, nome e email são obrigatórios');
  }

  try {
    const usuario = await db.Usuario.findByPk(req.body.id);

    if (!usuario) {
      return res.status(404).send('Usuário não encontrado');
    }

    usuario.nome = req.body.nome;
    usuario.email = req.body.email;
    await usuario.save();
    res.send(usuario);
  } catch (erro) {
    logger.registrarErro(erro);
    res.status(500).send('Erro ao editar usuário');
  }
});

app.post('/excluirUsuario', async function (req, res) {
  if (!req.body.id) {
    return res.status(400).send('Id é obrigatório');
  }

  try {
    const usuario = await db.Usuario.findByPk(req.body.id);

    if (!usuario) {
      return res.status(404).send('Usuário não encontrado');
    }

    await usuario.destroy();
    res.send('Usuário excluído');
  } catch (erro) {
    logger.registrarErro(erro);
    res.status(500).send('Erro ao excluir usuário');
  }
});

app.get('/categorias', async function (req, res) {
  try {
    const categorias = await db.Categoria.findAll();
    res.send(categorias);
  } catch (erro) {
    logger.registrarErro(erro);
    res.status(500).send('Erro ao consultar categorias');
  }
});

app.post('/cadastrarCategoria', async function (req, res) {
  if (!req.body.nome) {
    return res.status(400).send('Nome é obrigatório');
  }

  try {
    const categoria = await db.Categoria.create({
      nome: req.body.nome
    });
    res.send(categoria);
  } catch (erro) {
    logger.registrarErro(erro);
    res.status(500).send('Erro ao cadastrar categoria');
  }
});

app.post('/editarCategoria', async function (req, res) {
  if (!req.body.id || !req.body.nome) {
    return res.status(400).send('Id e nome são obrigatórios');
  }

  try {
    const categoria = await db.Categoria.findByPk(req.body.id);

    if (!categoria) {
      return res.status(404).send('Categoria não encontrada');
    }

    categoria.nome = req.body.nome;
    await categoria.save();
    res.send(categoria);
  } catch (erro) {
    logger.registrarErro(erro);
    res.status(500).send('Erro ao editar categoria');
  }
});

app.post('/excluirCategoria', async function (req, res) {
  if (!req.body.id) {
    return res.status(400).send('Id é obrigatório');
  }

  try {
    const categoria = await db.Categoria.findByPk(req.body.id);

    if (!categoria) {
      return res.status(404).send('Categoria não encontrada');
    }

    await categoria.destroy();
    res.send('Categoria excluída');
  } catch (erro) {
    logger.registrarErro(erro);
    res.status(500).send('Erro ao excluir categoria');
  }
});

app.get('/eventos', async function (req, res) {
  try {
    const where = {};

    if (req.query.titulo) {
      where.titulo = {
        [Op.like]: `%${req.query.titulo}%`
      };
    }

    if (req.query.categoriaId) {
      where.categoriaId = req.query.categoriaId;
    }

    const eventos = await db.Evento.findAll({
      where: where,
      order: [['titulo', 'ASC']]
    });
    res.send(eventos);
  } catch (erro) {
    logger.registrarErro(erro);
    res.status(500).send('Erro ao consultar eventos');
  }
});

app.post('/cadastrarEvento', async function (req, res) {
  if (!req.body.titulo || !req.body.data || !req.body.usuarioId || !req.body.categoriaId) {
    return res.status(400).send('Título, data, usuarioId e categoriaId são obrigatórios');
  }

  try {
    const evento = await db.Evento.create({
      titulo: req.body.titulo,
      data: req.body.data,
      usuarioId: req.body.usuarioId,
      categoriaId: req.body.categoriaId
    });
    res.send(evento);
  } catch (erro) {
    logger.registrarErro(erro);
    res.status(500).send('Erro ao cadastrar evento');
  }
});

app.post('/editarEvento', async function (req, res) {
  if (!req.body.id || !req.body.titulo || !req.body.data || !req.body.usuarioId || !req.body.categoriaId) {
    return res.status(400).send('Id, título, data, usuarioId e categoriaId são obrigatórios');
  }

  try {
    const evento = await db.Evento.findByPk(req.body.id);

    if (!evento) {
      return res.status(404).send('Evento não encontrado');
    }

    evento.titulo = req.body.titulo;
    evento.data = req.body.data;
    evento.usuarioId = req.body.usuarioId;
    evento.categoriaId = req.body.categoriaId;
    await evento.save();
    res.send(evento);
  } catch (erro) {
    logger.registrarErro(erro);
    res.status(500).send('Erro ao editar evento');
  }
});

app.post('/excluirEvento', async function (req, res) {
  if (!req.body.id) {
    return res.status(400).send('Id é obrigatório');
  }

  try {
    const evento = await db.Evento.findByPk(req.body.id);

    if (!evento) {
      return res.status(404).send('Evento não encontrado');
    }

    await evento.destroy();
    res.send('Evento excluído');
  } catch (erro) {
    logger.registrarErro(erro);
    res.status(500).send('Erro ao excluir evento');
  }
});

app.get('/anotacoes', async function (req, res) {
  try {
    const anotacoes = await Anotacao.find();
    res.send(anotacoes);
  } catch (erro) {
    logger.registrarErro(erro);
    res.status(500).send('Erro ao consultar anotações');
  }
});

app.post('/cadastrarAnotacao', async function (req, res) {
  if (!req.body.eventoId || !req.body.texto) {
    return res.status(400).send('eventoId e texto são obrigatórios');
  }

  try {
    const anotacao = await new Anotacao({
      eventoId: req.body.eventoId,
      texto: req.body.texto
    }).save();
    res.send(anotacao);
  } catch (erro) {
    logger.registrarErro(erro);
    res.status(500).send('Erro ao cadastrar anotação');
  }
});

app.post('/editarAnotacao', async function (req, res) {
  if (!req.body.id || !req.body.eventoId || !req.body.texto) {
    return res.status(400).send('Id, eventoId e texto são obrigatórios');
  }

  try {
    const anotacao = await Anotacao.findOneAndUpdate(
      { _id: req.body.id },
      {
        eventoId: req.body.eventoId,
        texto: req.body.texto
      }
    );

    if (!anotacao) {
      return res.status(404).send('Anotação não encontrada');
    }

    res.send('Anotação editada');
  } catch (erro) {
    logger.registrarErro(erro);
    res.status(500).send('Erro ao editar anotação');
  }
});

app.post('/excluirAnotacao', async function (req, res) {
  if (!req.body.id) {
    return res.status(400).send('Id é obrigatório');
  }

  try {
    const anotacao = await Anotacao.findOneAndDelete({
      _id: req.body.id
    });

    if (!anotacao) {
      return res.status(404).send('Anotação não encontrada');
    }

    res.send('Anotação excluída');
  } catch (erro) {
    logger.registrarErro(erro);
    res.status(500).send('Erro ao excluir anotação');
  }
});

app.listen(8081, function () {
  console.log('Servidor no http://localhost:8081');
});
