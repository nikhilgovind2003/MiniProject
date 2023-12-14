const express = require('express');
const router = express.Router();
const Category = require("../model/CategoryModel")
// ROUTES
// product GET
app.post(`/`, async(req, res) => {
    try {
      const category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
      })
      const categoryData = await category.save()
      if(!categoryData) return res.status(404).json("Category was not found")
      res.json(categoryData)
  
    } catch (error) {
      res.json({error: error})
    }
  });
  
  // product GET
  app.get(`/`, async(req, res) => {
    const categoryList = await Category.find();
    res.status(500).json(categoryList);
  });
  



module.exports = router