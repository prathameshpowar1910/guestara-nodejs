import { Router } from 'express';
import { 
  createCategory,
  editCategory, 
  getAllCategories, 
  getCategoryByNameOrId 
} from '../controllers/categoryController.js';

const router = Router();

// Create a category
router.post('/', createCategory);

// Get all categories
router.get('/', getAllCategories);

// Get a category by name or ID
router.get('/:identifier', getCategoryByNameOrId);

// Edit category attributes
router.put('/:id', editCategory);

export default router;