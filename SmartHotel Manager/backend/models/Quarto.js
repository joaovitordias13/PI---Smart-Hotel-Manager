const mongoose = require('mongoose');

const QuartoSchema = new mongoose.Schema(
  {
    numero: {
      type: String,
      required: [true, 'Número do quarto é obrigatório'],
      unique: true,
      trim: true,
    },
    andar: {
      type: Number,
      required: [true, 'Andar é obrigatório'],
    },
    tipo: {
      type: String,
      enum: ['solteiro', 'casal', 'suite', 'apartamento'],
      required: [true, 'Tipo de quarto é obrigatório'],
    },
    capacidade: {
      type: Number,
      required: [true, 'Capacidade é obrigatória'],
      min: 1,
    },
    precoPorNoite: {
      type: Number,
      required: [true, 'Preço por noite é obrigatório'],
      min: 0,
    },
    descricao: String,
    amenidades: [String], // Ex: ['TV', 'WiFi', 'Frigobar', 'Ar condicionado']
    status: {
      type: String,
      enum: ['disponivel', 'ocupado', 'manutencao'],
      default: 'disponivel',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Quarto', QuartoSchema);
