import { Schema, model } from 'mongoose';

const subCategorySchema = new Schema({
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
    default: undefined
  },
  tax: { 
    type: Number,
    default: undefined
  },
  category: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category', required: true 
  },
});

subCategorySchema.pre('save', async function(next) {
  if (this.isNew) {
    const category = await model('Category').findById(this.category);
    if (category) {
      this.taxApplicability = this.taxApplicability === undefined ? category.taxApplicability : this.taxApplicability;
      this.tax = this.tax === undefined ? category.tax : this.tax;
    }
  }
  next();
});

export const SubCategory =  model('SubCategory', subCategorySchema);