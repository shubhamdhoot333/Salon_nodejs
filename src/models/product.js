const mongoose = require("mongoose");
const { response } = require("express");
//mongoose schema 
const product =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    data:{
                type:String,
                required:true
             },
     email:{
                type:String,
                 required:true,
                
            },
     phone:{
        type:Number,
        required:true
            },
      amount:{
        type:Number,
        required:true
      } ,
      status:{
        type:String,
        
      }                          
})

const Product = new  mongoose.model("Product_detail",product);

module.exports = Product;