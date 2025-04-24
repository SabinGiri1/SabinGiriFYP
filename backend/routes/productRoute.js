import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();  // Fetch all products from the database
    console.log('Fetched Products:', products);
    res.json(products);  // Return products as JSON
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to add product to cart (dummy cart implementation)
router.post('/cart', (req, res) => {
  const { productId, quantity } = req.body;  // We receive productId and quantity from the client

  // Placeholder for actual cart logic (e.g., saving cart in user session or DB)
  console.log(`Added product with ID ${productId} to cart. Quantity: ${quantity}`);

  // Dummy response
  res.status(200).json({ message: `Product ${productId} added to cart!` });
});

export default router;
