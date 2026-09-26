const fs = require('fs');
const path = require('path');

class Logger {
  registrarErro(erro) {
    const mensagem = erro.message || String(erro);
    const linha = `${new Date().toISOString()} - ${mensagem}\n`;
    const arquivo = path.join(__dirname, 'logs', 'errors.log');

    fs.appendFileSync(arquivo, linha);
  }
}

module.exports = Logger;
