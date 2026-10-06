const express = require("express");

const router = express.Router();

const {
  getCategoryPage,
  showCreateCategoryPage,
  createCategory,
  showEditCategoryPage,
  updateCategoryById,
  deleteCategoryById,
} = require("../controllers/categoryViewController");

const { checkAuth } = require("../middlewarse/auth");

// =========================
// CATEGORY PAGES
// =========================

// Show all categories
router.get(
  "/categories",
  checkAuth,
  getCategoryPage
);

// Show create category page
router.get(
  "/categories/create",
  checkAuth,
  showCreateCategoryPage
);

// Create category
router.post(
  "/categories",
checkAuth,
  createCategory
);

// Show edit category page
router.get(
  "/categories/edit/:id",
  checkAuth,
  showEditCategoryPage
);

// Update category
router.post(
  "/categories/edit/:id",
 checkAuth,
  updateCategoryById
);

// Delete category
router.post(
  "/categories/delete/:id",
  checkAuth,
  deleteCategoryById
);

module.exports = router;