const mongoose = require('mongoose');

const anotacao = mongoose.Schema({
  eventoId: {
    type: Number,
    required: true
  },
  texto: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Anotacao', anotacao);
