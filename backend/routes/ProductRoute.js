import express from 'express';
import ProductController from "../controller/ProductController.js";


const router = express.Router();

router.post('/products', ProductController.createProduct);
router.delete('/:id', ProductController.deleteProduct)
router.get('/view', ProductController.readProduct)
router.put('/:id', ProductController.updateProduct)

export default router;