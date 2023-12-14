const express = require('express');
const router = express.Router();
const Product = require("../model/Products")

// ROUTES
// product GET
router.post(`/`, async(req, res) => {
    try {
      const product = new Product({
        image: req.body.image,
        title: req.body.title,
        price: req.body.price
      })
      await product.save()
      res.json(product)
  
    } catch (error) {
      res.json({error: error})
    }
  });
  
  // product GET
  router.get(`/`, async(req, res) => {
    const productList = await Product.find();
    res.status(500).json(productList);
  });
  



module.exports = router