const Transaction = require("../models/transaction")

async function createTransaction (req,res){
  try{
    const {
      title,
      amount,
      type,
      category,
      description,
      date,
      
    }=req.body

    const userId = req.user.id;
    const transaction= await Transaction.create({
       title,
      amount,
      type,
      category,
      description,
      date,
      userId,
    })
    return res.redirect("/view/transactions");

  }
  catch(error){
        return res.status(500).json({
    message: "Failed to create transaction",
  error: error.message,
    
  })}
}

// async function getTransactions(req, res) {
//   try {
//     const transactions = await Transaction.find()
//       .populate("category");

//     return res.status(200).json({
//       transactions,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Failed to get transactions",
//       error: error.message,
//     });
//   }
// }


async function getTransactions(req, res) {
  try {
    const {
      type,
      category,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {
     userId: req.user.id
    };

    if (type) {
      filter.type = type;
    }

    if (category) {
      filter.category = category;
    }

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const transactions = await Transaction.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(Number(limit));

    const totalTransactions = await Transaction.countDocuments(filter);

    return res.status(200).json({
      message: "Transactions fetched successfully",

      page: Number(page),

      limit: Number(limit),

      totalTransactions,

      totalPages: Math.ceil(
        totalTransactions / Number(limit)
      ),

      transactions,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}
async function getTransactionById(req, res) {
  try {
    const transactions = await Transaction.findById(req.params.id)
      .populate("category");

      if (!transactions) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
      transactions,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get transactions",
      error: error.message,
    });
  }
}




async function deleteTransactionById(req, res) {
  try {
    const transactions = await Transaction.findByIdAndDelete(req.params.id,)
     

      if (!transactions) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
         message: "Transaction deleted successfully",
      transactions,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete transactions",
      error: error.message,
    });
  }
}


async function updateTransactionById(req, res) {
  try {
    const transactions = await Transaction.findByIdAndUpdate(req.params.id,
      {
        new:true,
       runValidators: true,
      }
    )
     

      if (!transactions) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
         message: "Transaction updated successfully",
      transactions,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update transactions",
      error: error.message,
    });
  }
}

module.exports={
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransactionById,
  deleteTransactionById
}