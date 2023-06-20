const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    customer:String,
    amount: Number,
    settled: {type:Boolean, default: false}
});
const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = {Invoice};