import { SubCategory } from '../models/SubCategory.model.js';
import { Category } from '../models/Category.model.js';
import mongoose from 'mongoose';

const createSubCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const subCategory = new SubCategory({
      ...req.body,
      taxApplicability: req.body.taxApplicability ?? category.taxApplicability,
      tax: req.body.tax ?? category.tax,
    });

    await subCategory.save();
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate('category');
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAllSubCategoriesByCategory = async (req, res) => {
  try {
    const subCategories = await SubCategory.find({ category: req.params.categoryId }).populate('category');
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getSubCategoryByNameOrId = async (req, res) => {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    let query;
    if (ObjectId.isValid(req.params.identifier)) {
      query = { _id: req.params.identifier };
    } else {
      query = { name: new RegExp('^' + req.params.identifier + '$', 'i') };
    }

    const subCategory = await SubCategory.findOne(query).populate('category');

    if (!subCategory) {
      return res.status(404).json({ error: 'Sub-category not found' });
    }
    
    return res.json(subCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const editSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subCategory) {
      return res.status(404).json({ error: 'Sub-category not found' });
    }
    res.json(subCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export {
  createSubCategory,
  getAllSubCategories,
  getAllSubCategoriesByCategory,
  getSubCategoryByNameOrId,
  editSubCategory,
}