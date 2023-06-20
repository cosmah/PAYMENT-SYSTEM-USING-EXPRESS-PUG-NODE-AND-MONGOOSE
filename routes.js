const express = require('express');
const router = express.Router();
const {Invoice} = require('./model');

router.get('/', (req,res) => {
    res.render('index');
});

router.get('/customers', async (req,res) => {
    const customers = await Invoice.distinct('customer');
    res.json(customers);
});

router.get('/customer/:name/reciepts', async(req,res) => {
    const {name} = req.params;
    const reciepts = await Invoice.find({
        customer: name, settled:true});
    res.json(reciepts);
})

router.post('/payment', async (req,res) => {
    const {customer,amount,invoiceIds} = req.body;
    await Invoice.updateMany({_id: {$in:invoiceIds}}, {settled: true});
    res.sendStatus(200);
});

router.get('/customer/:name', async (req, res) => {
    const { name } = req.params;
    const invoices = await Invoice.find({ customer: name });
    res.json(invoices);
  });

//invoices//
// const {Invoice} = require('./model');

router.get('/new-invoice', async(req,res)=>{
    res.render('new-invoice');
});

router.post('/invoice', async(req,res)=>{
    const {customer, amount} = req.body;
    await Invoice.create({customer,amount});
    res.redirect('/new-invoice');
});

module.exports = router;