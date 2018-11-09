const mongoose = require("mongoose");
 const productsShema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    date_created:{
        type:Date,
        default:Date.now
    }
 });
 
 var Products = module.exports = mongoose.model("Products",productsShema);
 module.exports.getProducts = function(callback, limit){
    Products.find(callback).limit(limit);
 };

module.exports.addProducts = (products, callback)=>{
    Products.create(products, callback);
}