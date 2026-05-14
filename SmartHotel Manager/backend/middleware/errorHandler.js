// Middleware para tratamento centralizado de erros
const errorHandler = (err, req, res, next) => {
  console.error('❌ Erro:', err.message);

  // Erro de validação do Mongoose
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      erro: 'Erro de validação',
      detalhes: messages,
    });
  }

  // Erro de ID inválido (ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      erro: 'ID inválido',
    });
  }

  // Erro de duplicação (índice único)
  if (err.code === 11000) {
    const campo = Object.keys(err.keyPattern)[0];
    return res.status(409).json({
      erro: `${campo} já está registrado`,
    });
  }

  // Erro genérico
  res.status(err.status || 500).json({
    erro: err.message || 'Erro interno do servidor',
  });
};

module.exports = errorHandler;
