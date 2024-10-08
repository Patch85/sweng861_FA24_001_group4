const express = require("express");
const talentController = require("../controllers/talentController");
const verifyToken = require("../middleware/verifyToken"); // JWT verification middleware

const router = express.Router();

// Add new talent
router.post("/data", verifyToken, talentController.addTalent);

// Handle bulk upload
router.post("/upload", verifyToken, talentController.bulkUpload);

// Get all talent
router.get("/data", talentController.getAllTalent);

// Update talent by ID
router.put("/data/:id", talentController.updateTalent);

// Delete talent by ID
router.delete("/data/:id", talentController.deleteTalent);

// Get talents inputed by this user
router.get("/user-talents", verifyToken, talentController.getUserTalents);

module.exports = router;
