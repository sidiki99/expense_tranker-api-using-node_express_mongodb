const Category = require("../models/category");

async function createCategory(req,res){
  try{
    const {name,type} = req.body;
    const userId = req.user.id;
    const category = await  Category.create({
      name,
      type,
      userId,
    })
    return res.status(201).json({
            message: "Category created successfully",
      category,

    })
  }
  catch(error){
        return res.status(500).json({
      message: "Failed to create category",
      error: error.message,
    });


  }
}

async function getCategory(req,res){
  try{
    const categories = await Category.find();
    return res.status(200).json({
      categories,
    });
  }
  catch(error){
    return res.status(500).json({
       message: "Failed to get category",
      error: error.message,

    })

  }

}

async function getCategoryById(req,res){
  try{
    const category = await Category.findById(req.params.id);
    if(!category){
      return res.status(404).json({
        message: "Category not found",
      })}
    return res.status(200).json({
      category,
    });
  }
  catch(error){
    return res.status(500).json({
       message: "Failed to get category",
      error: error.message,

    })

  }

}


async function updateCategoryById(req,res){
  try{
    const category = await Category.findByIdAndUpdate(req.params.id,req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if(!category){
      return res.status(404).json({
        message: "Category not found",
      })}
    return res.status(200).json({
        message: "Category updated successfully",
      category,
    });
  }
  catch(error){
    return res.status(500).json({
       message: "Failed to get category",
      error: error.message,

    })

  }

}


async function deleteCategoryById(req,res){
  try{
    const category = await Category.findByIdAndDelete(req.params.id);
    if(!category){
      return res.status(404).json({
        message: "Category not found",
      })}
    return res.status(200).json({
        message: "Category deleted Successfully",
    });
  }
  catch(error){
    return res.status(500).json({
       message: "Failed to delete category",
      error: error.message,

    })

  }

}


module.exports={
  createCategory,
  getCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
}


