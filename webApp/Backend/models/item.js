const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { 
      type: String, 
      required: true, 
      maxlength: 32 
    },
    productDescription: { 
      type: String, 
      maxlength: 800 
    },
    price: { 
      type: Number, 
      required: true, 
      min: 0, 
      validate: {
        validator: function(value) {
          return /^\d+(\.\d{1,2})?$/.test(value); 
        },
        message: "Price must be in dollars (up to 2 decimal places)"
      }
    },
    build: { type: Number },
    photo: { type: String },
    category: { 
      type: String, 
      enum: ['Motorcycles', 'Gears', 'Spare Parts'], 
      required: true 
    },
    startDate: { 
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },
  { timestamps: true } 
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
