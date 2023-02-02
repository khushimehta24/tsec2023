// Importing modules
const express = require("express");
// Importing Middleware
const authorizeJWT = require("../middleware/jwt");
const upload = require("../middleware/upload");
// Importing controllers and utilities
const {
 getQuestions, submitResponses
} = require("../controllers/user");

// Initializing router
const router = new express.Router();

router.get("/questions", getQuestions);
router.post("/questionnaire", authorizeJWT.verifyJWT, submitResponses);

// Exporting Modules
module.exports = router;
