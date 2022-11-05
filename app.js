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

  res.statusCode(200).json({
    success: true,
    Product,
  });
});
app.get("/api/v1/get", (req, res) => {
  res.json({
    success: "True",
  });
});
app.listen(PORT);
console.log(`Server is working on port ${PORT} `);
