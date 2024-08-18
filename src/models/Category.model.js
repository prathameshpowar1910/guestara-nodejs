import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: { 
    type: String, 
    required: true 
  },
  taxApplicability: { 
    type: Boolean, 
    required: true,
  },
  tax: { 
    type: Number 
  },
  taxType: { 
    type: String 
  },
}, { timestamps: true }
);

export const Category =  model('Category', categorySchema);