'use strict';
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
var Products = require("./models/products");
var Prices = require("./models/prices");
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/products");
var db = mongoose.connection;
if(db){
    console.log("connected to mongodb database");
}else{
    console.log("Database not connected");
}

//main endpoint
app.get('/',
    (req, res)=>{
        res.send("Navigate to `api/products` or `api/prices` ");
    }
)

//Display the products inform of JSON
app.get('/api/products',(req, res)=>{
    Products.getProducts((error, products)=>{
        if(error){
            console.log("An error occured "+ error);
        }else{
            res.json(products);
        }
    });
});

//Add products to the database
app.post('/api/products',(req,res)=>{
    var products = req.body;
    Products.addProducts(products,
        (error, products)=>{
            if(error){
                console.log("An error was encountered "+error);
            }else{
                res.json(products);
            }
        })
});

//Display the prices
app.get('/api/prices',(req, res)=>{
    Prices.getPrices(
        (error, prices)=>{
            if(error){
                res.send(error);
            }else{
                res.json(prices);
            }
        }
    )
});

//Add a price item to the database
app.post('/api/prices',(req, res)=>{
    var Price = req.body;
    Prices.addPrices(Price,
        (error, prices)=>{
            if(error){
                console.log("Error adding a price item "+error);
            }else{
                res.json(prices)
            }
        }
    )
});

/*
app.listen(PORT, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Server running on port "+PORT);
    }
});
*/

app.listen(PORT, (error) =>{
    if(error){
        console.log("error running the server");
    }else{
        console.log("Server running on port "+ PORT);
    }
});