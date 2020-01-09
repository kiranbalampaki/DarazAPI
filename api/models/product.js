const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        //required: true
    },
    price: {
        type: Number,
        //required: true
    },
    discount_rate: {
        type: Number
    },
    rating:{
        type: Number
    }
})

const products = mongoose.model('Product',productSchema);
module.exports = products;