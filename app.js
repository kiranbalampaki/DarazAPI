const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

  const productRoutes = require("./api/routes/products");
const userRoutes = require("./api/routes/users");

mongoose.connect('mongodb://localhost:27017/darazdb', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan("dev"));
app.use('/upload', express.static(__dirname+'/public/uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//middleware to allow cross origin resource sharing (CORS)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT,PATCH,POST,DELETE,GET");
      return res.status(200).json({});
    }
    next();
});

//routes to handle requests
app.use('/products', productRoutes);
app.use('/users', userRoutes);


//handle routing errors
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;