const express = require("express");
const auth = require("../middleware/auth.middleware");
const {
  getAllStocks,
  addStocks,
  updateStock,
  deleteStock
} = require("../controllers/stockflow.controller");

const router = express.Router();

// Routes
router.get('/stocks', auth, getAllStocks);
router.post('/stocks', auth, addStocks);
router.put('/stocks/:id', auth, updateStock);
router.delete('/stocks/:id', auth, deleteStock);

module.exports = router;
