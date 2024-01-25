const express = require('express');
const router = express.Router();
const userModel = require("../model/userModel")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const SECRET_KEY = "super-secret-key";

router.post("/register", async (req, res) => {
  try {
    // const {username, email, password} = req.body;

    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
});

//GET Registered Users
router.get("/register", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to get users" });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "2h",
    });
    res.json({ message: "Login successful", token });
     // Include the token in the response
  } catch (error) {
    res.status(500).json({ error: "Error logging in" + error.message });
  }
});

module.exports = router
