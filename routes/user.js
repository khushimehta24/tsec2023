// Importing modules
const express = require("express");
// Importing Middleware
const authorizeJWT = require("../middleware/jwt");
const upload = require("../middleware/upload");
// Importing controllers and utilities
const {
 getQuestions, submitResponses, showInterest, tenantApproval
} = require("../controllers/user");

// Initializing router
const router = new express.Router();

router.get("/questions", getQuestions);
router.post("/questionnaire", authorizeJWT.verifyJWT, submitResponses);
router.post("/show-interest/:id", authorizeJWT.verifyJWT, showInterest);
router.put("/approval/:id", authorizeJWT.verifyJWT, tenantApproval);

// Exporting Modules
module.exports = router;
