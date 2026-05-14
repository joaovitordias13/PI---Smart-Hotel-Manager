const express = require('express');
const router = express.Router();
const Quarto = require('../models/Quarto');

// ➕ CRIAR quarto
router.post('/', async (req, res, next) => {
  try {
    const quarto = new Quarto(req.body);
    await quarto.save();
    res.status(201).json({
      mensagem: 'Quarto criado com sucesso',
      quarto,
    });
  } catch (error) {
    next(error);
  }
});

// 📋 LISTAR todos os quartos
router.get('/', async (req, res, next) => {
  try {
    const { status, tipo } = req.query;
    const filtros = {};
    
    if (status) filtros.status = status;
    if (tipo) filtros.tipo = tipo;
    
    const quartos = await Quarto.find(filtros).sort({ numero: 1 });
    res.json({
      total: quartos.length,
      quartos,
    });
  } catch (error) {
    next(error);
  }
});

// 🔍 BUSCAR quarto por ID
router.get('/:id', async (req, res, next) => {
  try {
    const quarto = await Quarto.findById(req.params.id);
    if (!quarto) {
      return res.status(404).json({ erro: 'Quarto não encontrado' });
    }
    res.json(quarto);
  } catch (error) {
    next(error);
  }
});

// ✏️ ATUALIZAR quarto
router.put('/:id', async (req, res, next) => {
  try {
    const quarto = await Quarto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!quarto) {
      return res.status(404).json({ erro: 'Quarto não encontrado' });
    }
    res.json({
      mensagem: 'Quarto atualizado com sucesso',
      quarto,
    });
  } catch (error) {
    next(error);
  }
});

// 🗑️ DELETAR quarto
router.delete('/:id', async (req, res, next) => {
  try {
    const quarto = await Quarto.findByIdAndDelete(req.params.id);
    if (!quarto) {
      return res.status(404).json({ erro: 'Quarto não encontrado' });
    }
    res.json({
      mensagem: 'Quarto deletado com sucesso',
      quarto,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
