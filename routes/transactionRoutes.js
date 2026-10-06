const  express = require ("express");
const {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransactionById,
  deleteTransactionById
}= require("../controllers/transactionController")

const router= express.Router();
// router.post("/",createTransaction)
// router.get("/", getTransactions);

// router.get("/:id", getTransactionById);

// router.put("/:id", updateTransactionById);

// router.delete("/:id", deleteTransactionById);

module.exports = router;