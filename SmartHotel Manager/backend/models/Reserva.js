const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
  nome: String,
  data: String
});

module.exports = mongoose.model('Reserva', ReservaSchema);