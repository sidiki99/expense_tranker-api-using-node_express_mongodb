const Transaction = require("../models/transaction");
const mongoose = require("mongoose");

async function getDashboard(req, res) {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const result = await Transaction.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: { $cond: [{ $eq: ["$type", "Income"] }, "$amount", 0] },
          },
          totalExpense: {
            $sum: { $cond: [{ $eq: ["$type", "Expense"] }, "$amount", 0] },
          },
          incomeCount: {
            $sum: { $cond: [{ $eq: ["$type", "Income"] }, 1, 0] },
          },
          expenseCount: {
            $sum: { $cond: [{ $eq: ["$type", "Expense"] }, 1, 0] },
          },
          totalTransactions: { $sum: 1 },
        },
      },
    ]);
    const dashboard = result[0] || {
      totalIncome: 0,
      totalExpense: 0,
      incomeCount: 0,
      expenseCount: 0,
      totalTransactions: 0,
    };
    const balance = dashboard.totalIncome - dashboard.totalExpense;
    return res.status(200).json({
      message: "Dashboard fetched successfully",
      totalIncome: dashboard.totalIncome,
      totalExpense: dashboard.totalExpense,
      balance,
      incomeCount: dashboard.incomeCount,
      expenseCount: dashboard.expenseCount,
      totalTransactions: dashboard.totalTransactions,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Dashboard error", error: error.message });
  }
} // =============================== // GET CATEGORY SUMMARY // ===============================
//
async function getCategorySummary(req, res) {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const result = await Transaction.aggregate([
      { $match: { userId: userId, type: "Expense" } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } },
    ]);
    return res
      .status(200)
      .json({
        message: "Category summary fetched successfully",
        categories: result,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}


async function showDashboard(req, res) {
  try {

    const userId = new mongoose.Types.ObjectId(req.user.id);

    // Get dashboard data
    const dashboardResult = await Transaction.aggregate([

      {$match: { userId: userId, }, },

      { $group: { _id: null, totalIncome: {
            $sum: {
              $cond: [
                { $eq: ["$type", "Income"] },
                "$amount",
                0,
              ],
            },
          },

          totalExpense: {
            $sum: {
              $cond: [
                { $eq: ["$type", "Expense"] },
                "$amount",
                0,
              ],
            },
          },

          incomeCount: {
            $sum: {
              $cond: [
                { $eq: ["$type", "Income"] },
                1,
                0,
              ],
            },
          },

          expenseCount: {
            $sum: {
              $cond: [
                { $eq: ["$type", "Expense"] },
                1,
                0,
              ],
            },
          },

          totalTransactions: {
            $sum: 1,
          },
        },
      },

    ]);


    // Get category summary
    const categories = await Transaction.aggregate([

      {
        $match: {
          userId: userId,
          type: "Expense",
        },
      },

      {
        $group: {
          _id: "$category",

          total: {
            $sum: "$amount",
          },
        },
      },

      {
        $sort: {
          total: -1,
        },
      },

    ]);


    const data = dashboardResult[0] || {

      totalIncome: 0,
      totalExpense: 0,
      incomeCount: 0,
      expenseCount: 0,
      totalTransactions: 0,

    };


    const dashboard = {

      totalIncome: data.totalIncome,

      totalExpense: data.totalExpense,

      balance: data.totalIncome - data.totalExpense,

      incomeCount: data.incomeCount,

      expenseCount: data.expenseCount,

      totalTransactions: data.totalTransactions,

    };


    // Send data to EJS
    return res.render("dashboard", {

      dashboard: dashboard,
      categories: categories,

    });


  } catch (error) {

    return res.status(500).send(
      "Dashboard error: " + error.message
    );

  }
}



module.exports = {
  getDashboard,
  getCategorySummary,
  showDashboard
};
module.exports = { getDashboard, getCategorySummary,showDashboard };

// async function getDashboard(req, res) {
//   try {
//     const userId = new mongoose.Types.ObjectId(req.user.id);

//     const result = await Transaction.aggregate([
//       {
//         $match: {
//           userId: userId,
//         },
//       },
//       {
//         $group: {
//           _id: null,

//           totalIncome: {
//             $sum: {
//               $cond: [
//                 { $eq: ["$type", "Income"] },
//                 "$amount",
//                 0,
//               ],
//             },
//           },

//           totalExpense: {
//             $sum: {
//               $cond: [
//                 { $eq: ["$type", "Expense"] },
//                 "$amount",
//                 0,
//               ],
//             },
//           },

//           incomeCount: {
//             $sum: {
//               $cond: [
//                 { $eq: ["$type", "Income"] },
//                 1,
//                 0,
//               ],
//             },
//           },

//           expenseCount: {
//             $sum: {
//               $cond: [
//                 { $eq: ["$type", "Expense"] },
//                 1,
//                 0,
//               ],
//             },
//           },

//           totalTransactions: {
//             $sum: 1,
//           },
//         },
//       },
//     ]);

//     const dashboard = result[0] || {
//       totalIncome: 0,
//       totalExpense: 0,
//       incomeCount: 0,
//       expenseCount: 0,
//       totalTransactions: 0,
//     };

//     const balance = dashboard.totalIncome - dashboard.totalExpense;

//     return res.status(200).json({
//       message: "Dashboard fetched successfully",
//       totalIncome: dashboard.totalIncome,
//       totalExpense: dashboard.totalExpense,
//       balance,
//       incomeCount: dashboard.incomeCount,
//       expenseCount: dashboard.expenseCount,
//       totalTransactions: dashboard.totalTransactions,
//     });

//   } catch (error) {
//     return res.status(500).json({
//       message: "Dashboard error",
//       error: error.message,
//     });
//   }
// }

// async function getCategorySummary(req, res) {
//   try {
//     const userId = req.user._id;

//     const result = await Transaction.aggregate([
//       {
//         $match: {
//           userId: userId,
//           type: "expense",
//         },
//       },

//       {
//         $group: {
//           _id: "$category",

//           total: {
//             $sum: "$amount",
//           },
//         },
//       },

//       {
//         $sort: {
//           total: -1,
//         },
//       },
//     ]);

//     return res.status(200).json({
//       message: "Category summary fetched successfully",
//       categories: result,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// }

// module.exports = {
//   getDashboard,
//   getCategorySummary
// };
