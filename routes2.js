const express = require('express');
const router = express.Router();
const {Invoice} = require('./model');

//imported model
const Customer = require("./Models/customerModel")
const SR = require("./Models/srModel")
// const Supplier = require("../Models/supplierModel")

//people
router.get("/people/people",(req,res)=>{
    res.render("people/people")
  });
//add customer
router.get("/customer",(req,res)=>{
    res.render("customer")
  });

//add salesman
router.get("/sr",(req,res)=>{
    res.render("sr")
  });

//add supplier
router.get("/people/supplier",(req,res)=>{
    res.render("people/supplier")
  });


//CUSTOMER
router.post("/customer" ,async(req,res)=>{
    try{
        const customers = new Customer(req.body);
        await customers.save()
        res.redirect('/customer')//redirect to a path, render a file
        console.log(req.body)
    }
    catch(error){
    res.status(400).send("Failed to add customer. Please try again.")
    console.log(error)
    }
})

//SR
router.post("/sr" ,async(req,res)=>{
    try{
        const customers = new SR(req.body);
        await customers.save()
        res.redirect('/sr')//redirect to a path, render a file
        console.log(req.body)
    }
    catch(error){
    res.status(400).send("Failed to add salesman. Please try again.")
    console.log(error)
    }
})

//SR
router.post("/people/supplier" ,async(req,res)=>{
    try{
        const supplier = new Supplier(req.body);
        await supplier.save()
        res.redirect('/people/supplier')//redirect to a path, render a file
        console.log(req.body)
    }
    catch(error){
    res.status(400).send("Failed to add supplier. Please try again.")
    console.log(error)
    }
})

//saleman_list page
router.get("/people/salesman_list",async (req,res)=>{
  try {
    const items = await SR.find();
    res.render('people/salesman_list', {srs: items });
  } catch (err) {
    console.log(err);
    res.send('Failed');
  }
  
})

//customers_list page
router.get("/people/customer_list",async (req,res)=>{
  try {
    const items = await Customer.find();
    res.render('people/customer_list', {customers: items });
  } catch (err) {
    console.log(err);
    res.send('Failed');
  }
  
})

//supplier_list page
router.get("/people/supplier_list",async (req,res)=>{
  try {
    const items = await Supplier.find();
    res.render('people/supplier_list', {suppliers: items });
  } catch (err) {
    console.log(err);
    res.send('Failed');
  }
  
})




module.exports = router;