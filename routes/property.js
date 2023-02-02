// Importing modules
const express = require("express");
// Importing Middleware
const authorizeJWT = require("../middleware/jwt");

// Importing controllers and utilities
const {
    addProperty,
    getAllProperties,
    getMyProperties,
    getSingleProperty,
    getPropertiesByLocation,
    getPropertiesByCity,
 

} = require("../controllers/property");

// Initializing router
const router = new express.Router();

router.post("/add", authorizeJWT.verifyJWT, addProperty);
router.get("/all", getAllProperties);
router.get("/my", authorizeJWT.verifyJWT, getMyProperties);
router.get("/single/:id", getSingleProperty);
router.get("/location/:location", getPropertiesByLocation);
router.get("/city/:city", getPropertiesByCity);

module.exports = router;