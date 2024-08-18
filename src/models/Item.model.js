import { Schema, model } from 'mongoose';

const itemSchema = new Schema({
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
    required: true 
  },
  tax: { 
    type: Number 
  },
  baseAmount: { 
    type: Number, 
    required: true 
  },
  discount: { 
    type: Number, 
    default: 0 
  },
  totalAmount: { 
    type: Number, 
  },
  category: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  subCategory: { 
    type: Schema.Types.ObjectId, 
    ref: 'SubCategory' 
  },
});

itemSchema.pre('save', function(next) {
  this.totalAmount = this.baseAmount - this.discount;

  // Ensure either category or subCategory is provided
  if (!this.category && !this.subCategory) {
    next(new Error('Item must belong to either a category or a subcategory'));
  } else {
    next();
  }
});

export const Item = model('Item', itemSchema);