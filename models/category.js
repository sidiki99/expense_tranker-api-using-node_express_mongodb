const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  
    name: {
      type: String,
      required: true,
      trim: true,
    },
      type: {
      type: String,
      enum: ["Income", "Expense"],
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

})

const Category = mongoose.model("Category",categorySchema);
module.exports = Category;