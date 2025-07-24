const inventory = require("../models/inventory.model");

// Add new inventory item
exports.addInventory = async (req, res) => {
  try {
    const item = await inventory.create(req.body);
    res.status(201).json({ status: true, message: "Inventory item created successfully.", data: item });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      error: "Something went wrong.",
      error_data: err,
    });
  }
};

// View all inventory items
exports.viewInventory = async (req, res) => {
  try {
    const items = await inventory.find({});
    res.status(200).json({ status: true, data: items });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      error: "Something went wrong.",
      error_data: err,
    });
  }
};

// Get inventory item by ID
exports.getInventoryById = async (req, res) => {
  try {
    const item = await inventory.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ status: false, error: "Item not found." });
    }
    res.status(200).json({ status: true, data: item });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      error: "Something went wrong.",
      error_data: err,
    });
  }
};

// Update inventory item by ID
exports.updateInventory = async (req, res) => {
  try {
    const item = await inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      return res.status(404).json({ status: false, error: "Item not found." });
    }
    res.status(200).json({ status: true, message: "Item updated successfully.", data: item });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      error: "Something went wrong.",
      error_data: err,
    });
  }
};

// Delete inventory item by ID
exports.deleteInventory = async (req, res) => {
  try {
    const item = await inventory.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ status: false, error: "Item not found." });
    }
    res.status(200).json({ status: true, message: "Item deleted successfully." });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      error: "Something went wrong.",
      error_data: err,
    });
  }
};