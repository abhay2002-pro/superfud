const Mealtype = require("../models/mealtype");
const fs = require("fs");

exports.getAllMealTypes = (req, res) => {
  Mealtype.find()
    .then((result) => {
      res.status(200).json({
        message: "MealTyes fetched successfully",
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "DB error Occured",
        error: error,
      });
    });
};
