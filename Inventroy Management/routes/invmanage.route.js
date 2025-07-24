const express = require("express");

const router = express.Router();

const {
  addInvmanage,
  viewInvManage,
  getInvManageById,
  updateInvManage,
  deleteInvManage
} = require("../controllers/invmanage.controllers");

// Add new invmanage record
router.post("/", addInvmanage);

// View all invmanage records
router.get("/", viewInvManage);

// Get invmanage record by ID
router.get("/:id", getInvManageById);

// Update invmanage record by ID
router.put("/:id", updateInvManage);

// Delete invmanage record by ID
router.delete("/:id", deleteInvManage);

module.exports = router;