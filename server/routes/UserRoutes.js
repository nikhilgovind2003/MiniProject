const express = require('express');
const router = express.Router();
const userModel = require("../model/userModel")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const SECRET_KEY = "super-secret-key";

// Collaborative Filtering Recommendation Endpoint
router.get("/collaborativeFiltering/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Get the user's purchase history
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userPurchases = user.purchases || [];

    // Retrieve all users
    const allUsers = await userModel.find();

    // Initialize an empty map to store item scores
    const itemScores = new Map();

    // Loop through all users to find similar users
    for (const otherUser of allUsers) {
      if (otherUser._id.toString() !== userId) {
        const otherUserPurchases = otherUser.purchases || [];

        // Calculate Jaccard similarity between the current user and other users
        const intersection = userPurchases.filter(item => otherUserPurchases.includes(item));
        const union = [...new Set([...userPurchases, ...otherUserPurchases])];
        const similarity = intersection.length / union.length;

        // Update item scores based on the similarity
        for (const item of otherUserPurchases) {
          if (!userPurchases.includes(item)) {
            itemScores.set(item, (itemScores.get(item) || 0) + similarity);
          }
        }
      }
    }

    // Sort items by score in descending order
    const sortedItems = Array.from(itemScores.entries()).sort((a, b) => b[1] - a[1]);

    // Retrieve the top N recommended items
    const topNRecommendations = sortedItems.slice(0, 5).map(([itemId]) => itemId);

    res.json({ recommendations: topNRecommendations });
  } catch (error) {
    console.error("Error fetching collaborative filtering recommendations:", error);
    res.status(500).json({ error: "Error fetching collaborative filtering recommendations" });
  }
});

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


router.post("/logout", (req, res) => {
  try {
    // For token-based authentication, you do not need to destroy a session on the server.
    // Instead, the client side handles token removal or invalidation.

    // Optionally, you can include additional logic to blacklist or invalidate the token on the server side.

    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ error: "Error during logout" });
  }
});


module.exports = router
