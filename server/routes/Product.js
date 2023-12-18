const express = require("express");
const router = express.Router();
const Product = require("../model/Products");
const CategoryModel = require("../model/CategoryModel");

// ROUTES
// product GET
router.post(`/`, async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.body.category);
    if (!category) return res.status(400).send("Invvalid category");
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
    });

    let products = await product.save();
    if (!products) return res.status(400).send("The product cannot created");
    res.send(products);
  } catch (error) {
    res.status(200).json({ error: error });
  }
});

// product GET
router.get(`/`, async (req, res) => {
  const productList = await Product.find();
  res.status(500).json(productList);
});

router.put("/:id", async (req, res) => {
  const products = await Product.findById(req.body.category);
  if (!products) return res.status(400).send("Invalid product");
  let product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
    },
    { new: true }
  );

  if (!product) {
    return res
      .status(400)
      .json({ success: true, message: "The product cannot created" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    if (!products) {
      return res.status(400).status({
        sucess: false,
        message: "The category of given ID was not found",
      });
    } else {
      res.status(500).json(products);
    }
  } catch (error) {
    res.status(200).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      return res
        .status(200)
        .json({ success: true, message: "The product is deleted" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
});

router.get("/get/count", async (req, res) => {
  try {
    const ProductCount = await Product.countDocuments();
    if (!ProductCount) {
      return res.status(400).status({ sucess: false });
    }
    res.status(500).json({ ProductCount: ProductCount });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});


router.get("/get/featured/count", async (req, res) => {
  try {
    const count=  req.params.count?req.params.count:0
    const product = await Product.find({isFeatured: true}).limit(+count)
    if (!product) {
      return res.status(400).status({ sucess: false });
    }
    res.status(500).json({ product: product });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;
