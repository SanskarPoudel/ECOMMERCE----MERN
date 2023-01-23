const mongoose = require("mongoose");
const User = require("./UserModel");
const productShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter the name of product"],
    trim: true,
    maxLength: [15, "Product name cannot exceed than 15 character"],
  },
  description: {
    type: String,
    required: [true, "Please add a description of your product"],
    maxLength: [4000, "Description cannot exceed than 4000 character"],
  },
  price: {
    type: Number,
    required: [true, "Price of product is required"],
    maxLength: [8, "Price cannot exceed than 8 digits"],
  },
  discountPrice: {
    type: String,
    maxLength: [4, "Discount price cannot exceed than 4 digits"],
  },
  color: {
    type: String,
  },
  size: {
    type: String,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please add a category of your product"],
  },
  stock: {
    type: Number,
    required: [true, "Please add how many product are avaiable in your stock"],
    maxLength: [3, "Discount price cannot exceed than 3 digits"],
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
      },
      time: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productShema);
