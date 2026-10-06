const Category = require("../models/category");


async function getCategoryPage(req, res) {
  try {
    const userId = req.user.id;
    const categories = await Category.find({ userId });

    res.render("categories/index", {
      categories,
      message: null,
      error: null,
    });
  } catch (error) {
    res.status(500).send("Failed to load categories: " + error.message);
  }
}


function showCreateCategoryPage(req, res) {
  res.render("categories/create", {
    error: null,
  });
}


async function createCategory(req, res) {
  try {
    const { name, type } = req.body;
    const userId = req.user.id;

    await Category.create({
      name,
      type,
      userId,
    });

    return res.redirect("/view/categories");
  } catch (error) {
    res.status(500).render("categories/create", {
      error: error.message,
    });
  }
}


async function showEditCategoryPage(req, res) {
  try {
    const userId = req.user.id;

    const category = await Category.findOne({
      _id: req.params.id,
      userId,
    });

    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.render("categories/edit", {
      category,
      error: null,
    });
  } catch (error) {
    res.status(500).send("Failed to load category");
  }
}


async function updateCategoryById(req, res) {
  try {
    const { name, type } = req.body;
    const userId = req.user.id;

    const category = await Category.findOneAndUpdate(
      {
        _id: req.params.id,
        userId,
      },
      {
        name,
        type,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return res.status(404).send("Category not found");
    }

    return res.redirect("/view/categories");
  } catch (error) {
    res.status(500).send("Failed to update category: " + error.message);
  }
}


async function deleteCategoryById(req, res) {
  try {
    const userId = req.user.id;

    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      userId,
    });

    if (!category) {
      return res.status(404).send("Category not found");
    }

    return res.redirect("/view/categories");
  } catch (error) {
    res.status(500).send("Failed to delete category: " + error.message);
  }
}

module.exports = {
  getCategoryPage,
  showCreateCategoryPage,
  createCategory,
  showEditCategoryPage,
  updateCategoryById,
  deleteCategoryById,
};