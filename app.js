const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/rest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected with Rest database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
const PORT = 4500;
const ProductSchema = new mongoose.Schema({
  name: String,
  descrption: String,
  price: Number,
});

const Product = new mongoose.model("Product", ProductSchema);
//Create Product
app.post("/api/v1/product/new", async (req, res) => {
  await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: req.body,
  });
});
//Get all Products
app.get("/api/v1/product/get", async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products, //products:products
  });
});
app.get("/api/v1/get", (req, res) => {
  res.json({
    success: "True",
  });
});

//Put Request for updating products
app.put("/api/v1/product/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  //2nd argument => vo chij jo hm update krna chahte hai
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found in database",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    message: "Product updated Succesfully.",
  });
});
//DELETE REQUEST FOR DELETING PRODUCT
app.delete("/api/v1/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found in database",
    });
  }

  await product.remove();
  res.status(200).json({
    status: "success",
    message: "Product deleted Succesfully.",
  });
});

app.listen(PORT);
console.log(`Server is working on port ${PORT} `);
