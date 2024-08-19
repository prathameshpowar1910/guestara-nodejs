import { Category } from "../models/Category.model.js";
import logger from "../utils/logger.js";
import mongoose from "mongoose";

const createCategory = async (req, res) => {
  try {
    const data = req.body;
    if (!data.name) {
      logger.error('Category name is required');
      return res.status(400).json({ error: 'Category name is required' });
    }
    const category = new Category(req.body);
    await category.save();
    logger.info(`Category created: ${category}`);
    res.status(201).json(category);
  } catch (error) {
    logger.error(error.message);
    res.status(400).json({ error: error.message });
  }
}

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (categories.length === 0) {
      logger.error('No categories found');
      return res.status(404).json({ error: 'No categories found' });
    }

    logger.info(`Categories retrieved: ${categories.length}`);
    res.json(categories);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
}

const getCategoryByNameOrId = async (req, res) => {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    let query;
    if (ObjectId.isValid(req.params.identifier)) {
      query = { _id: req.params.identifier };
    } else {
      query = { name: new RegExp('^' + req.params.identifier + '$', 'i') };
    }

    const category = await Category.findOne(query);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const editCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export {
  createCategory,
  getAllCategories,
  getCategoryByNameOrId,
  editCategory,
}