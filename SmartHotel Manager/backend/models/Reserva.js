const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema(
  {
    hospede: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospede',
      required: [true, 'Hóspede é obrigatório'],
    },
    quarto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quarto',
      required: [true, 'Quarto é obrigatório'],
    },
    dataCheckIn: {
      type: Date,
      required: [true, 'Data de check-in é obrigatória'],
    },
    dataCheckOut: {
      type: Date,
      required: [true, 'Data de check-out é obrigatória'],
    },
    precoTotal: {
      type: Number,
      required: [true, 'Preço total é obrigatório'],
      min: 0,
    },
    status: {
      type: String,
      enum: ['pendente', 'confirmada', 'checkin', 'checkout', 'cancelada'],
      default: 'pendente',
    },
    numeroHospedes: {
      type: Number,
      required: [true, 'Número de hóspedes é obrigatório'],
      min: 1,
    },
    observacoes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Reserva', ReservaSchema);