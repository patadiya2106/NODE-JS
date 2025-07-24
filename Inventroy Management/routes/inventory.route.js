const express = require("express");
const router = express.Router();

const {
  addInventory,
  viewInventory,
  getInventoryById,
  updateInventory,
  deleteInventory
} = require("../controllers/inventory.controller");

// Add new inventory item
router.post("/", addInventory);

// View all inventory items
router.get("/", viewInventory);

// Get inventory item by ID
router.get("/:id", getInventoryById);

// Update inventory item by ID
router.put("/:id", updateInventory);

// Delete inventory item by ID
router.delete("/:id", deleteInventory);

module.exports = router;