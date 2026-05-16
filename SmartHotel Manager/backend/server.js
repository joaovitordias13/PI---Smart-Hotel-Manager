// 🔹 Importações
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 🔹 Importar conexão com BD
const connectDB = require('./config/database');

// 🔹 Importar middlewares
const errorHandler = require('./middleware/errorHandler');

// 🔹 Importar rotas
const reservasRoutes = require('./routes/reservas');
const quartosRoutes = require('./routes/quartos');
const hospedesRoutes = require('./routes/hospedes');
const pagamentosRoutes = require('./routes/pagamentos');

// 🔹 Inicialização do app
const app = express();

// 🔹 Conectar ao MongoDB
connectDB();

// 🔹 Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));
app.use(express.json());

// 🔹 Rota inicial (teste)
app.get('/', (req, res) => {
  res.json({
    mensagem: '✅ API Smart Hotel Manager funcionando!',
    version: '1.0.0',
    endpoints: {
      hospedes: '/hospedes',
      quartos: '/quartos',
      reservas: '/reservas',
      pagamentos: '/pagamentos',
    },
  });
});

// 🔹 Rotas da API
app.use('/hospedes', hospedesRoutes);
app.use('/quartos', quartosRoutes);
app.use('/reservas', reservasRoutes);
app.use('/pagamentos', pagamentosRoutes);

// 🔹 Rota 404
app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    endpoint: req.originalUrl,
  });
});

// 🔹 Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// 🔹 Inicializar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📝 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});