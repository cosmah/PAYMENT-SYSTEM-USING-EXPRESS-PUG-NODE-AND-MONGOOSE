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

router.get('/customer/:name/receipts', async (req, res) => {
  const { name } = req.params;
  const receipts = await Invoice.find({ customer: name, settled: false });
  res.json(receipts);
});



router.post('/payment', async (req, res) => {
  console.log('Payment route called');
  const { customer, amount, invoiceIds } = req.body;
  console.log('Received data:', { customer, amount, invoiceIds });
  try {
    await Invoice.updateMany(
      { _id: { $in: invoiceIds }, settled: false },
      { settled: true }
    );
  
    const settledInvoices = await Invoice.find({ _id: { $in: invoiceIds }, settled: true });
  
    console.log('Invoices settled:', settledInvoices);
    console.log('Payment successful');
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }  
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