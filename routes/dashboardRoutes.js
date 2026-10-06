const express = require("express");

const router = express.Router();

const {
  getDashboard,getCategorySummary,showDashboard
} = require("../controllers/dashboardController");

const {checkAuth} = require("../middlewarse/auth");

router.get("/", checkAuth, showDashboard);
router.get("/dashboard", checkAuth, getDashboard);
// router.get("/category", checkAuth, getCategorySummary);
router.get("/category-summary", checkAuth, getCategorySummary);

module.exports = router;