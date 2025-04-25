import express from 'express';
import { addProduct, updateProduct, deleteProduct, getAllProducts, getProductDetails } from '../controllers/adminController.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// POST - Add a new product (Admin)
router.post('/add-product', upload.single('imageFile'), addProduct);

// PUT - Update an existing product by ID (Admin)
router.put('/:id',upload.single('imageFile'), updateProduct);

// DELETE - Remove a product by ID (Admin)
router.delete('/:id', deleteProduct);

// GET all products for Admin dashboard view (Admin)
router.get('/admin', getAllProducts);

router.get('/product-details/:productId', getProductDetails)

export default router;
