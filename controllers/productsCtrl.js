import Product from "../model/Product.js";
import asyncHandler from "express-async-handler";
export const createProduct = asyncHandler(async(req,res)=>{
    const {name, description, category,sizes,colors,user,price,totalQty,brand} = req.body;
    // product already exists
    const productExists = await Product.findOne({name});
    if(productExists){
        throw new Error("Product already exists");
    }
    // create new product
    const product = await Product.create({
        name,
        description,
        category,
        sizes,
        colors,
        user:req.userAuthId,
        price,
        totalQty,
        brand
    });
    // push new product into category
    res.status(201).json({
        status:"success",
        message:"Product created successfully",
        product,
    })
});

export const getProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find();
    res.json({
        status:"success",
        products,
    });
});