const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');

// ➕ CRIAR reserva
router.post('/', async (req, res, next) => {
  try {
    const reserva = new Reserva(req.body);
    await reserva.save();
    await reserva.populate('hospede quarto');
    
    res.status(201).json({
      mensagem: 'Reserva criada com sucesso',
      reserva,
    });
  } catch (error) {
    next(error);
  }
});

// 📋 LISTAR todas as reservas
router.get('/', async (req, res, next) => {
  try {
    const { status } = req.query;
    const filtros = {};
    
    if (status) filtros.status = status;
    
    const reservas = await Reserva.find(filtros)
      .populate('hospede', 'nome email telefone')
      .populate('quarto', 'numero tipo precoPorNoite')
      .sort({ dataCheckIn: -1 });
    
    res.json({
      total: reservas.length,
      reservas,
    });
  } catch (error) {
    next(error);
  }
});

// 🔍 BUSCAR reserva por ID
router.get('/:id', async (req, res, next) => {
  try {
    const reserva = await Reserva.findById(req.params.id)
      .populate('hospede')
      .populate('quarto');
    
    if (!reserva) {
      return res.status(404).json({ erro: 'Reserva não encontrada' });
    }
    res.json(reserva);
  } catch (error) {
    next(error);
  }
});

// ✏️ ATUALIZAR reserva
router.put('/:id', async (req, res, next) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('hospede quarto');
    
    if (!reserva) {
      return res.status(404).json({ erro: 'Reserva não encontrada' });
    }
    res.json({
      mensagem: 'Reserva atualizada com sucesso',
      reserva,
    });
  } catch (error) {
    next(error);
  }
});

// 🗑️ DELETAR reserva
router.delete('/:id', async (req, res, next) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (!reserva) {
      return res.status(404).json({ erro: 'Reserva não encontrada' });
    }
    res.json({
      mensagem: 'Reserva deletada com sucesso',
      reserva,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
