import { Router } from 'express';
import { 
  createSubCategory, 
  editSubCategory, 
  getAllSubCategories, 
  getAllSubCategoriesByCategory, 
  getSubCategoryByNameOrId 
} from '../controllers/subCategoryController.js';

const router = Router();

// Create a sub-category
router.post('/', createSubCategory);

// Get all sub-categories
router.get('/', getAllSubCategories);

// Get all sub-categories under a category
router.get('/category/:categoryId', getAllSubCategoriesByCategory);

// Get a sub-category by name or ID
router.get('/:identifier', getSubCategoryByNameOrId);

// Edit sub-category attributes
router.put('/:id', editSubCategory);

export default router;