const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email}) //Check if email id exists
    .exec()
    .then(user => {
        if (user.length >=1) {
            return res.status(409).json({
                message: 'Email ID exists'
            });
        }
        else{
            let password = req.body.password;
    bcrypt.hash(password, 10, (err, hash)=> { //hash password using bcrypt
        if (err) {
            let err =  new Error('Error hashing');
            err.status = 500;
            return next(err);
        }
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: hash,
            phone: req.body.phone
        });
        user.save()
            .then((user) => {
            //let token = jwt.sign({ _id: user._id }, jwtSecret);
            res.json({ status: "Signup success!"});
        }).catch(next);
    });
        }
    })
    
});


module.exports = router;