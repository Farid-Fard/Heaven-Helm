const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema(
    { 
    owner: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    productName: { type: String, required: true, maxlength: 32 },
    productDescription: { type: String,maxlength: 800 },
    initialPrice: { type: Number, required: true, min:0, validate: {
        validator: function(value) {
          
          return value.toFixed(2) === value.toString();
        },
        message: "Price must be in dollars (up to 2 decimal places)"
      } },
    build: { type: Number},
    photo: { type: String,  }    
    // required:true
}, 
{timestamps:true});
   
const Item = mongoose.model("Item", itemSchema)

module.exports = Item;