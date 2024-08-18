import { Category } from "../models/Category.model.js";
import { Item } from "../models/Item.model.js";
import { SubCategory } from "../models/SubCategory.model.js";

const createItem = async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      taxApplicability,
      tax,
      baseAmount,
      discount,
      categoryId,
      subCategoryId
    } = req.body;

    if (!categoryId && !subCategoryId) {
      return res.status(400).json({ error: 'Either categoryId or subCategoryId must be provided' });
    }

    let category, subCategory;

    if (subCategoryId) {
      subCategory = await SubCategory.findById(subCategoryId).populate('category');
      if (!subCategory) {
        return res.status(404).json({ error: 'SubCategory not found' });
      }
      category = subCategory.category;
    } else if (categoryId) {
      category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
    }

    const item = new Item({
      name,
      image,
      description,
      taxApplicability,
      tax,
      baseAmount,
      discount,
      category: category ? category._id : undefined,
      subCategory: subCategory ? subCategory._id : undefined
    });

    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('category').populate('subCategory');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAllItemsByCategory = async (req, res) => {
  try {
    const items = await Item.find({ category: req.params.categoryId }).populate('category').populate('subCategory');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAllItemsBySubCategory = async (req, res) => {
  try {
    const items = await Item.find({ subCategory: req.params.subCategoryId }).populate('category').populate('subCategory');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getItemByNameOrId = async (req, res) => {
  try {
    const item = await Item.findOne({
      $or: [{ _id: req.params.identifier }, { name: req.params.identifier }],
    }).populate('category').populate('subCategory');
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const editItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const searchItem = async (req, res) => {
  try {
    const items = await Item.find({ name: { $regex: req.params.query, $options: 'i' } })
      .populate('category')
      .populate('subCategory');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  createItem,
  getAllItems,
  getAllItemsByCategory,
  getAllItemsBySubCategory,
  getItemByNameOrId,
  editItem,
  searchItem,
}