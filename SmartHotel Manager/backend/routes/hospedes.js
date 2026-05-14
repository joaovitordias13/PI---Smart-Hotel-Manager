const express = require('express');
const router = express.Router();
const Hospede = require('../models/Hospede');

// ➕ CRIAR hóspede
router.post('/', async (req, res, next) => {
  try {
    const hospede = new Hospede(req.body);
    await hospede.save();
    res.status(201).json({
      mensagem: 'Hóspede criado com sucesso',
      hospede,
    });
  } catch (error) {
    next(error);
  }
});

// 📋 LISTAR todos os hóspedes
router.get('/', async (req, res, next) => {
  try {
    const hospedes = await Hospede.find().sort({ createdAt: -1 });
    res.json({
      total: hospedes.length,
      hospedes,
    });
  } catch (error) {
    next(error);
  }
});

// 🔍 BUSCAR hóspede por ID
router.get('/:id', async (req, res, next) => {
  try {
    const hospede = await Hospede.findById(req.params.id);
    if (!hospede) {
      return res.status(404).json({ erro: 'Hóspede não encontrado' });
    }
    res.json(hospede);
  } catch (error) {
    next(error);
  }
});

// ✏️ ATUALIZAR hóspede
router.put('/:id', async (req, res, next) => {
  try {
    const hospede = await Hospede.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!hospede) {
      return res.status(404).json({ erro: 'Hóspede não encontrado' });
    }
    res.json({
      mensagem: 'Hóspede atualizado com sucesso',
      hospede,
    });
  } catch (error) {
    next(error);
  }
});

// 🗑️ DELETAR hóspede
router.delete('/:id', async (req, res, next) => {
  try {
    const hospede = await Hospede.findByIdAndDelete(req.params.id);
    if (!hospede) {
      return res.status(404).json({ erro: 'Hóspede não encontrado' });
    }
    res.json({
      mensagem: 'Hóspede deletado com sucesso',
      hospede,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
