const express = require('express');
const productRouter = express.Router();
const Product = require("../Models/Product");

// Create a new product
productRouter.post('/add', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).send({ message: 'Product created successfully', product });
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// Get all products
productRouter.get('/all', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// Get product by ID
productRouter.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// Update a product
productRouter.put('/:id', async (req, res) => {
    try {
        await Product.update(req.body, { where: { id: req.params.id } });
        res.send('Product updated successfully');
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a product
productRouter.delete('/:id', async (req, res) => {
    try {
        await Product.destroy({ where: { id: req.params.id } });
        res.send('Product deleted successfully');
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = productRouter;
