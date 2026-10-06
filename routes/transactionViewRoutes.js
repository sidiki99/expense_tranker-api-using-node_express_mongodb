const express = require("express");

const router = express.Router();

const {
  getTransactionById,
  getAllTransactions,
  showTransaction,
  getUpdateTransactionById,
  postUpdateTransactionById,
  deleteTransactionById
} = require("../controllers/transactionViewController");

const {
  checkAuth,
} = require("../middlewarse/auth");

const {
  createTransaction
} = require("../controllers/transactionController");

// All transactions
router.get(
  "/transactions",
  checkAuth,
  getAllTransactions
);

// Create page
router.get(
  "/transactions/create",
  checkAuth,
  showTransaction
);

// Create transaction
router.post(
  "/transactions/create",
  checkAuth,
  createTransaction
);

// Transaction details
router.get(
  "/transactions/:id",
  checkAuth,
  getTransactionById
);

// Edit page
router.get(
  "/transactions/:id/edit",
  checkAuth,
  getUpdateTransactionById
);

// Update transaction
router.post(
  "/transactions/:id/edit",
  checkAuth,
  postUpdateTransactionById
);

// Delete transaction
router.post(
  "/transactions/:id/delete",
  checkAuth,
  deleteTransactionById
);

module.exports = router;