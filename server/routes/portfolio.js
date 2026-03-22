const express = require('express');
const router = express.Router();

const portfolios = new Map();
let idCounter = 1;

router.post('/', (req, res) => {
  try {
    const id = idCounter++;
    const portfolio = { 
      ...req.body, 
      _id: id.toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    portfolios.set(id.toString(), portfolio);
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const portfolio = portfolios.get(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    if (!portfolios.has(req.params.id)) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    const portfolio = { 
      ...portfolios.get(req.params.id),
      ...req.body, 
      _id: req.params.id,
      updatedAt: new Date().toISOString()
    };
    portfolios.set(req.params.id, portfolio);
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    if (!portfolios.has(req.params.id)) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    portfolios.delete(req.params.id);
    res.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
