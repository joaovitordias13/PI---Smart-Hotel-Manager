const mongoose = require('mongoose');

const PagamentoSchema = new mongoose.Schema(
  {
    reserva: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reserva',
      required: [true, 'Reserva é obrigatória'],
    },
    valor: {
      type: Number,
      required: [true, 'Valor é obrigatório'],
      min: 0,
    },
    metodo: {
      type: String,
      enum: ['credito', 'debito', 'dinheiro', 'transferencia', 'pix'],
      required: [true, 'Método de pagamento é obrigatório'],
    },
    status: {
      type: String,
      enum: ['pendente', 'confirmado', 'reembolsado'],
      default: 'pendente',
    },
    dataProcessamento: {
      type: Date,
      default: Date.now,
    },
    transacaoId: String,
    observacoes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Pagamento', PagamentoSchema);
