const express = require("express");
const router = express.Router();
const Category = require("../model/CategoryModel");
const mongoose = require("mongoose");
// ROUTES


// product GET
router.post(`/`, async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    });
    const categoryData = await category.save();
    if (!categoryData) return res.status(404).json("Category was not found");
    res.status(500).json(categoryData);
  } catch (error) {
    res.status(200).json({ error: error });
  }
});

// category GET
router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();
  res.status(500).json(categoryList);
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(400).status({
        sucess: false,
        message: "The category of given ID was not found",
      });
    } else {
      res.status(500).json(category);
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});




//  PUT Request
router.put("/:id", async (req, res) => {
  if(mongoose.isValidObjectId(req.params.id)){
    res.status(402).send("Invalid Object ID")
  }
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      color:req.body.color,
      icon:req.body.icon
    },
    { new: true}
  )

  if(!category){
    return res.status(400).json({success: true, message: "The category cannot created"})
  }
})



router.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (deletedCategory) {
      return res
        .status(200)
        .json({ success: true, message: "The Category is deleted" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
});

module.exports = router;
