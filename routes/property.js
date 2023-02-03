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
    getInterestedUsersByPropertyId,
    getSinglePropertyWithTenants,
    getPropertiesWithinRadius,
    getCloseByProperties,
    getInterestedUsersByOwnerId

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
router.post("/sample/pictures", addPictures)
router.get("/interested-users/:id", authorizeJWT.verifyJWT, getInterestedUsersByPropertyId);
router.get("/single/compatibility/:id", authorizeJWT.verifyJWT, getSinglePropertyWithTenants);
router.get("/radius/:lat/:lon/:radius", getPropertiesWithinRadius);
router.get("/close-by/:lat/:lon", getCloseByProperties);
router.get("/interested-users/owner", authorizeJWT.verifyJWT, getInterestedUsersByOwnerId);




module.exports = router;