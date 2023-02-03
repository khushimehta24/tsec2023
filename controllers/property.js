const Property = require("../models/property");
const User = require("../models/user");

const axios = require("axios");
const cloudinary = require("../utils/cloudinary");
const { removeSensitiveData } = require("../utils/functions");
const Questionnaire = require("../models/questionnaire");

const geolib = require('geolib');
const addProperty = async (req, res) => {
    try {
        
        const user = req.user;
        let property = new Property({
            ...req.body,
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
        const properties = await Property.find({owner: user._id}).populate("interestedUsers")
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

const getSinglePropertyWithTenants = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user._id).populate("questionnaire");
        const property = await Property.findById(id).populate("owner").populate("tenants")
        // .populate("reviews").populate("tenants");

        if(!user.questionnaire) {
            return res.status(400).json({
                message: "Please complete your questionnaire before you can view this property!",
            })
        } 

        let compatible = 0;
        const updatedTenants = [];
        for(tenant of property.tenants) {
            tenant = removeSensitiveData(tenant);
            const compatibleResponses = [];
            const differentResponses = [];
            if(tenant.questionnaire) {
                const tenantQuestionnaire = await Questionnaire.findById(tenant.questionnaire);
                for (response of user.questionnaire.responses) {
                    for (tenantResponse of tenantQuestionnaire.responses) {
                        if(response.question === tenantResponse.question) {
                            if(response.expectedAnswers.includes(tenantResponse.answer)) {
                                if(tenantResponse.expectedAnswers.includes(response.answer)){
                                    compatible++;
                                compatibleResponses.push(response);
                                }
                                else {
                                    differentResponses.push(response);
                                }
                                
                            } else {
                                differentResponses.push(response);
                            }
                        }
                    }
                }

                let compatibilityScore = (compatible / user.questionnaire.responses.length) * 100;
                compatibilityScore = Math.round((compatibilityScore + Number.EPSILON) * 100) / 100
                updatedTenants.push({
                    ...tenant._doc,
                    compatibilityScore,
                    compatibleResponses,
                    differentResponses
                })

                console.log(updatedTenants)

            } else {
                updatedTenants.push(tenant);
            }

        }
        res.status(200).json({
            message: "Successfully fetched the property!",
            data: {
                ...property._doc,
                tenants: updatedTenants
            }
        })

        
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
}

const getPropertiesWithinRadius = async (req, res) => {
    try {
        const { lat, lon, radius } = req.params;
      
        const properties = await Property.find({}).populate("owner");
        // .populate("reviews").populate("tenants");
        const propertiesWithinRadius = [];
        for(let property of properties) {
            property.owner = removeSensitiveData(property.owner)
            console.log(property.lat, property.lon)
            const isClose = geolib.isPointWithinRadius(
                { latitude: property.lat, longitude: property.lon },
                { latitude: lat, longitude: lon },
                radius*1000
            );
            console.log(isClose)
            if(isClose) {
                propertiesWithinRadius.push(property);
            }

        }
        res.status(200).json({
            message: "Successfully fetched all properties in the radius!",
            data: propertiesWithinRadius
        })
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
}
const getCloseByProperties = async (req, res) => {
    try {
        const { lat, lon } = req.params;
        
        const properties = await Property.find({}).populate("owner");
        // .populate("reviews").populate("tenants");
        const propertiesWithinRadius = [];
        for(let property of properties) {
            property.owner = removeSensitiveData(property.owner)
            const isClose = geolib.isPointWithinRadius(
                { latitude: property.lat, longitude: property.lon },
                { latitude: lat, longitude: lon },
                10000
            );
            if(isClose) {
                propertiesWithinRadius.push(property);
            }

        }
        res.status(200).json({
            message: "Successfully fetched all properties close by!",
            data: propertiesWithinRadius
        })
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
}
const addPictures = async (req, res) => {
    try {
    //     if (req.files.pictures) {
         
    //             const pictures = [];
    //             const files = req.files.pictures;
    //             let index = 0;
    //             for(let picture of files) {
    //               if (picture != null && picture) {
    //                 const result = await cloudinary.uploader.upload(picture.path, {
    //                   public_id:
    //                     "samples/" + picture.originalname + index.toString(),
                     
    //                 });
    //                 pictures.push(result.secure_url);
    //               }
    //               index++;
    // }
                
    //            const properties = await Property.find({});
    //             for (let property of properties) {
    //                 const shuffled = pictures.sort(() => 0.5 - Math.random());
    //                 let selected = shuffled.slice(0, 4);
    //                 console.log(selected);
    //                 property.pictures = selected;
    //                 await property.save();
    //             }
          
                
              
    //     }

    const user = await User.findById("63dbb25c8f843bfacb6cd510");
    const notFound = []
    for (let property of user.properties) {
        
        const foundProperty = await Property.findById(property);
        if(!foundProperty){
            notFound.push(property);
        }
    }
    console.log(notFound);
    const newprops = user.properties.filter((property) => !notFound.includes(property));
    const updatedUser = await User.findByIdAndUpdate("63dbb25c8f843bfacb6cd510", {properties: newprops});
     res.status(200).json({
            message: "Successful!",
        })

    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
}

const getInterestedUsersByPropertyId = async (req, res) => {
    try {   
        const property = await Property.findById(req.params.id).populate("interestedUsers");
        if (!property) {
            return res.status(404).json({
                message: "Property not found",
            });
        }

        for (let user of property.interestedUsers) {    
            user = removeSensitiveData(user);
        }
        res.status(200).json({
            message: "Interested users fetched successfully",
            users: property.interestedUsers,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }
};

const getInterestedUsersByOwnerId = async (req, res) => {
    try {
 
        const properties = await Property.find({ owner: req.user._id }).populate("interestedUsers");
        // if (!properties) {
        //     return res.status(404).json({
        //         message: "Properties not found",
        //     });
        // }
        console.log(req.user);
        const interestedUsers = [];
        for (let property of properties) {
            for (let user of property.interestedUsers) {
                interestedUsers.push({
                    property: property,
                    user
                });
            }
        }
        res.status(200).json({
            message: "Interested users fetched successfully",
            users: interestedUsers,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }
};

module.exports = {
    addProperty,
    getAllProperties,
    getPropertiesByLocation,
    getPropertiesByCity,
    getMyProperties,
    getSingleProperty,
    addPictures,
    getInterestedUsersByPropertyId,
    getSinglePropertyWithTenants,
    getPropertiesWithinRadius,
    getCloseByProperties,
    getInterestedUsersByOwnerId,
}