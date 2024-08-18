import { Router } from 'express';
import { 
  createItem, 
  editItem, 
  getAllItems, 
  getAllItemsByCategory, 
  getAllItemsBySubCategory, 
  getItemByNameOrId, 
  searchItem 
} from '../controllers/itemController.js';

const router = Router();

// Create an item
router.post('/', createItem);

// Get all items
router.get('/', getAllItems);

// Get all items under a category
router.get('/category/:categoryId', getAllItemsByCategory);

// Get all items under a sub-category
router.get('/subcategory/:subCategoryId', getAllItemsBySubCategory);

// Get an item by name or ID
router.get('/:identifier', getItemByNameOrId);

// Edit item attributes
router.put('/:id', editItem);

// Search item by name
router.get('/search/:query', searchItem);

export default router;