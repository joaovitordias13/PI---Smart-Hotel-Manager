// 🔹 Importações
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 🔹 Model
const Reserva = require('./models/Reserva');

// 🔹 Inicialização do app
const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Conexão com MongoDB LOCAL
mongoose.connect('mongodb://localhost:27017/hotel')
  .then(() => console.log('MongoDB conectado LOCAL'))
  .catch(err => console.log('Erro ao conectar:', err));

// 🔹 Rota inicial (teste)
app.get('/', (req, res) => {
  res.send('API funcionando');
});

// 🔹 ROTA: Criar reserva (POST)
app.post('/reservas', async (req, res) => {
  try {
    const novaReserva = new Reserva(req.body);
    await novaReserva.save();
    res.status(201).json(novaReserva);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao salvar reserva' });
  }
});

// 🔹 ROTA: Listar reservas (GET)
app.get('/reservas', async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar reservas' });
  }
});

// 🔹 Inicializar servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});