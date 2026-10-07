const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

// GET ALL REVIEWS
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({
      createdAt: -1,
    });

    res.json(reviews);
  } catch (error) {
    console.error("Fetch reviews error:", error);

    res.status(500).json({
      message: "Server error while fetching reviews.",
    });
  }
});

// ADD REVIEW
router.post("/", async (req, res) => {
  try {
    const {
      userName,
      restaurantName,
      dishName,
      rating,
      comment,
      image,
    } = req.body;

    if (
      !userName ||
      !restaurantName ||
      !rating ||
      !comment
    ) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
      });
    }

    const review = await Review.create({
      userName,
      restaurantName,
      dishName: dishName || "",
      rating,
      comment,
      image: image || "",
    });

    res.status(201).json({
      message: "Review added successfully.",
      review,
    });
  } catch (error) {
    console.error("Add review error:", error);

    res.status(500).json({
      message: "Server error while adding review.",
    });
  }
});

module.exports = router;