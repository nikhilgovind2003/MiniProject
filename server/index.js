const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./model/userModel");
const bcrypt = require("bcrypt");
const bodyparser =  require("body-parser")
const app = express();

app.use(cors());
app.use(bodyparser.json())
// ROUTES

app.get("/", (req, res) => {
  res.json("hello world");
});

const SECRET_KEY = "super-secret-key";

app.post("/register", async (req, res) => {
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
app.get("/register", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to get users" });
  }
});

//LOGIN
app.post("/login", async (req, res) => {
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
      expiresIn: "infinite",
    });
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

mongoose
  .connect(
    "mongodb+srv://MiniProject:T4YIiOkgJIUko4z7@mycluster.vjyyclj.mongodb.net/miniiProject?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Mongodb Connected successfully");
    app.listen(4000, () => {
      console.log(`Server runs at the port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
