const express = require("express");
const {
  createCategory,
  getCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById
}= require("../controllers/categoryController")

const router = express.Router();

// router.post("/", createCategory);

// router.get("/", getCategory);

// router.get("/:id", getCategoryById);

// router.put("/:id", updateCategoryById);

// router.delete("/:id", deleteCategoryById);

module.exports = router;