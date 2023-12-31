const express = require('express');
const { Model } = require('mongoose');
const router = express.Router();
//import product model
const Product = require("./Models/productModel")
//- const Category = require("../Models/categoryModel")
//- const Supplier = require("../Models/supplierModel");
;

// Render the add product page with dynamic data
router.get("/inventory/addproduct", async (req, res) => {
  try {
    const categories = await Category.find(); // Fetch categories from MongoDB
    const suppliers = await Supplier.find(); // Fetch suppliers from MongoDB
    res.render("inventory/addproduct", { categories, suppliers });
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to fetch data from the database.");
  }
});

//add category page
router.get("/inventory/category",(req,res)=>{
    res.render("inventory/category")
  });


 
  // Handle add product form submission
  router.post("/product", async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.redirect('product'); // Redirect to the add product page after successful submission
      console.log(req.body);
    } catch (error) {
      res.status(400).send("Failed to add product. Please try again.");
      console.log(error);
    }
  });
  
  // Handle add category form submission
  router.post("/inventory/category", async (req, res) => {
    try {
      const category = new Category(req.body);
      await category.save();
      res.redirect('/inventory/category'); // Redirect to the add product page after successful submission
      console.log(req.body);
    } catch (error) {
      res.status(400).send("Failed to add product category. Please try again.");
      console.log(error);
    }
  });
  

//products page
router.get("/product",async (req,res)=>{
  try {
    const items = await Product.find();
    res.render('product', {products: items });
  } catch (err) {
    console.log(err);
    res.send('Failed');
  }
  
})

//PRODUCT DELETE 
router.delete('/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      console.log(`No product found with id: ${productId}`);
      res.status(404).send({ error: 'Product not found' });
    } else {
      console.log(`Deleted product with id: ${productId}`);
      res.status(200).send({ message: 'Product deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to delete product' });
  }
});

  module.exports=router