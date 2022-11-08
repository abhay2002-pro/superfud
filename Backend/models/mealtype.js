const mongoose = require("mongoose");

const mealTypeSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  content: {
    type: "string",
    required: true,
  },
  image: {
    type: "string",
    required: true,
  },
});

module.exports = mongoose.model("MealTypes", mealTypeSchema, "mealtype");
