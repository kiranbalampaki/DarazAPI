const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
/*     image: {
        type: String
    }, */
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
})

const users = mongoose.model('User',userSchema);
module.exports = users;