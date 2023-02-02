const Property = require("../models/property");
const User = require("../models/user");

const axios = require("axios");
const cloudinary = require("../utils/cloudinary");
const addProperty = async (req, res) => {
    try {
        
        const user = req.user;
        let property = new Property({
            ...req.body,
            coordinates: JSON.parse(req.body.coordinates),
            owner: user._id
        });
        if (req.files.pictures) {
         
            const pictures = [];
            const files = req.files.pictures;
            let index = 0;
            for(let picture of files) {
              if (picture != null && picture) {
                const result = await cloudinary.uploader.upload(picture.path, {
                  public_id:
                    "propertypictures/" + property._id + (index+1).toString(),
                 
                });
                pictures.push(result.secure_url);
              }
              index++;
        }
        property.pictures = pictures;
    }
        
        property = await property.save();
        user.properties.push(property._id);
        await user.save();
        
        res.status(201).json({
            message: "Successfully added property!",
            data: property
        })
        

    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
}

const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find({}).populate("owner");
        // .populate("reviews").populate("tenants");
        res.status(200).json({
            message: "Successfully fetched all properties!",
            data: properties
        })
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
}

const getPropertiesByLocation = async (req, res) => {
    try {
        const { location } = req.params;
        const properties = await Property.find({area_location: location}).populate("owner")
        // .populate("reviews").populate("tenants");

        res.status(200).json({
            message: "Successfully fetched all properties!",
            data: properties
        })
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
}

const getPropertiesByCity = async (req, res) => {
    try {
        const { city } = req.params;
        const properties = await Property.find({city: city}).populate("owner")
        // .populate("reviews").populate("tenants");
        res.status(200).json({
            message: "Successfully fetched all properties!",
            data: properties
        })
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
}

const getMyProperties = async (req, res) => {
    try {
        const user = req.user;
        const properties = await Property.find({owner: user._id}).populate("owner")
        // .populate("reviews").populate("tenants");
        res.status(200).json({
            message: "Successfully fetched all properties!",
            data: properties
        })
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
}

const getSingleProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property.findById(id).populate("owner")
        // .populate("reviews").populate("tenants");
        res.status(200).json({
            message: "Successfully fetched the property!",
            data: property
        })
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
}

const addPictures = async (req, res) => {
    try {
        if (req.files.pictures) {
         
                const pictures = [];
                const files = req.files.pictures;
                let index = 0;
                for(let picture of files) {
                  if (picture != null && picture) {
                    const result = await cloudinary.uploader.upload(picture.path, {
                      public_id:
                        "samples/" + picture.originalname + index.toString(),
                     
                    });
                    pictures.push(result.secure_url);
                  }
                  index++;
    }
                
               const properties = await Property.find({});
                for (let property of properties) {
                    const shuffled = pictures.sort(() => 0.5 - Math.random());
                    let selected = shuffled.slice(0, 4);
                    console.log(selected);
                    property.pictures = selected;
                    await property.save();
                }
          
                
              
        }
        res.status(200).json({
            message: "Successfully added pictures!",
        })

    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
}

module.exports = {
    addProperty,
    getAllProperties,
    getPropertiesByLocation,
    getPropertiesByCity,
    getMyProperties,
    getSingleProperty,
    addPictures
}