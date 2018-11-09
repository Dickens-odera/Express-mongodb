var mongoose = require("mongoose");
var PricesSchema = mongoose.Schema({
    item:{
        type:String,
        required:true
 },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:String,
        required:true
    }
});

var Prices = module.exports = mongoose.model("Prices", PricesSchema);
module.exports.getPrices = (callback, limit)=>{
    Prices.find(callback, limit);
}

module.exports.addPrices = (prices, callback)=>{
    Prices.create(prices, callback);
}