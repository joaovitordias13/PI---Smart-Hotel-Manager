const mongoose = require('mongoose');

const HospedeSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email é obrigatório'],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido'],
    },
    telefone: {
      type: String,
      required: [true, 'Telefone é obrigatório'],
    },
    cpf: {
      type: String,
      required: [true, 'CPF é obrigatório'],
      unique: true,
    },
    dataNascimento: {
      type: Date,
      required: [true, 'Data de nascimento é obrigatória'],
    },
    endereco: {
      rua: String,
      numero: String,
      cidade: String,
      estado: String,
      cep: String,
    },
    nacionalidade: {
      type: String,
      default: 'Brasileira',
    },
    documento: {
      tipo: {
        type: String,
        enum: ['CPF', 'RG', 'Passaporte'],
        default: 'CPF',
      },
      numero: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Hospede', HospedeSchema);
