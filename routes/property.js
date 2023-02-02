// Importing modules
const express = require("express");
// Importing Middleware
const authorizeJWT = require("../middleware/jwt");

const upload = require("../middleware/upload");
// Importing controllers and utilities
const {
    addProperty,
    getAllProperties,
    getMyProperties,
    getSingleProperty,
    getPropertiesByLocation,
    getPropertiesByCity,
    addPictures,
 

} = require("../controllers/property");

// Initializing router
const router = new express.Router();

router.post("/add", [upload.fields([
    {
        name: "pictures",
        maxCount: 20
    }
]), authorizeJWT.verifyJWT], addProperty);
router.get("/all", getAllProperties);
router.get("/my", authorizeJWT.verifyJWT, getMyProperties);
router.get("/single/:id", getSingleProperty);
router.get("/location/:location", getPropertiesByLocation);
router.get("/city/:city", getPropertiesByCity);
router.post("/sample/pictures", upload.fields([
    {
        name: "pictures",
        maxCount: 30
    }
]), addPictures)
module.exports = router;