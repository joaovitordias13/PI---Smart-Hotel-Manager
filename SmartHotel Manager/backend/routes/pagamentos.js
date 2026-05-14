const express = require('express');
const router = express.Router();
const Pagamento = require('../models/Pagamento');

// ➕ CRIAR pagamento
router.post('/', async (req, res, next) => {
  try {
    const pagamento = new Pagamento(req.body);
    await pagamento.save();
    await pagamento.populate('reserva');
    
    res.status(201).json({
      mensagem: 'Pagamento registrado com sucesso',
      pagamento,
    });
  } catch (error) {
    next(error);
  }
});

// 📋 LISTAR todos os pagamentos
router.get('/', async (req, res, next) => {
  try {
    const { status, metodo } = req.query;
    const filtros = {};
    
    if (status) filtros.status = status;
    if (metodo) filtros.metodo = metodo;
    
    const pagamentos = await Pagamento.find(filtros)
      .populate('reserva')
      .sort({ createdAt: -1 });
    
    res.json({
      total: pagamentos.length,
      pagamentos,
    });
  } catch (error) {
    next(error);
  }
});

// 🔍 BUSCAR pagamento por ID
router.get('/:id', async (req, res, next) => {
  try {
    const pagamento = await Pagamento.findById(req.params.id)
      .populate('reserva');
    
    if (!pagamento) {
      return res.status(404).json({ erro: 'Pagamento não encontrado' });
    }
    res.json(pagamento);
  } catch (error) {
    next(error);
  }
});

// ✏️ ATUALIZAR pagamento
router.put('/:id', async (req, res, next) => {
  try {
    const pagamento = await Pagamento.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('reserva');
    
    if (!pagamento) {
      return res.status(404).json({ erro: 'Pagamento não encontrado' });
    }
    res.json({
      mensagem: 'Pagamento atualizado com sucesso',
      pagamento,
    });
  } catch (error) {
    next(error);
  }
});

// 🗑️ DELETAR pagamento
router.delete('/:id', async (req, res, next) => {
  try {
    const pagamento = await Pagamento.findByIdAndDelete(req.params.id);
    if (!pagamento) {
      return res.status(404).json({ erro: 'Pagamento não encontrado' });
    }
    res.json({
      mensagem: 'Pagamento deletado com sucesso',
      pagamento,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
