import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  image: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    sttypear: Number,
    required: true,
  },
});
