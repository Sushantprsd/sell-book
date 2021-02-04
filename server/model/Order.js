const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
   products:[{
      productData:{
         type:Object,
         required : true
      },
      quantity:{
         type:Number,
         required:true
      }
   }],
   user:{
      email:{
         type:String,
         required:true
      },
      userId:{
         type:Schema.Types.ObjectId,
         required:true,
         ref:'User',
      }
   }
})

// orderSchema.index({ "user.userId": 1 }, { unique: true }, { index: true });
module.exports = mongoose.model('Orders',orderSchema);