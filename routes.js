const express = require('express');
const router = express.Router();
const { Invoice } = require('./model');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/customers', async (req, res) => {
  const customers = await Invoice.distinct('customer');
  res.json(customers);
});

router.get('/customer/:name/reciepts', async (req, res) => {
  const { name } = req.params;
  const receipts = await Invoice.find({ customer: name, settled: false });
  res.json(receipts);
});


router.post('/payment', async (req, res) => {
  const { customer, amount, invoiceIds } = req.body;
  console.log('Payment details:', customer, amount, invoiceIds);

  try {
    const invoices = await Invoice.find({ _id: { $in: invoiceIds }, settled: false });
    const updatedInvoices = [];

    for (const invoice of invoices) {
      if (invoice.amount <= amount) {
        await Invoice.findByIdAndUpdate(invoice._id, { settled: true });
        updatedInvoices.push(invoice._id);
        amount -= invoice.amount;
      }
    }

    if (amount > 0) {
      // If there's remaining amount, create a new invoice with the remaining amount
      await Invoice.create({ customer, amount, settled: true });
      updatedInvoices.push('remaining');
    }

    console.log('Invoices to be settled:', updatedInvoices);
    console.log('Payment successful');

    res.sendStatus(200);
  } catch (error) {
    console.error('An error occurred during payment:', error);
    res.status(500).json({ success: false, error: 'An error occurred during payment.' });
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
