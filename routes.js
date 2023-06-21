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

// router.get('/customer/:name/reciepts', async(req,res) => {
//     const {name} = req.params;
//     const reciepts = await Invoice.find({
//         customer: name, settled:true});
//     res.json(reciepts);
// })
router.get('/customer/:name/receipts', async(req, res) => {
    const { name } = req.params;
    const receipts = await Invoice.find({ customer: name, settled: false }); // Only retrieve unsettled receipts
    res.json(receipts);
  });
  

router.post('/payment', async (req,res) => {
    const {customer,amount,invoiceIds} = req.body;
    console.log(customer, amount, invoiceIds);
    try {
        await Invoice.updateMany({_id: {$in:invoiceIds}}, {settled: true});
    } catch (error) {
        console.error(error); // Log any errors that are caught
    }
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