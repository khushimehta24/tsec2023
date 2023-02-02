const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        pictures: [{
            type: String,
            trim: true,
        }],
        lat: {
            type: Number,
            trim: true,
        },
        lon: {
            type: Number,
            trim: true,
        },
        posted_on : {
            type: String,
            trim: true,
        },
        bhk: {
            type: Number,
            trim: true,
        },
        rent: {
            type: Number,
            trim: true,
        },
        size: {
            type: Number,
            trim: true,
        },
        floor: {
            type: String,
            trim: true,
        },
        area_type: {
            type: String,
            trim: true,
        },
        area_location: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        pincode: {
            type: Number,
            trim: true,
        },
        state: {
            type: String,
            trim: true,
        },
        furnishing_status: {
            type: String,
            trim: true,
        },
        tenant_preferred: {
            type: String,
            trim: true,
        },
        bathroom: {
            type: Number,
            trim: true,
        },
        point_of_contact: {
            type: String,
            trim: true,
        },
        max_occupants: {
            type: Number,
            trim: true,
        },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review",
            },
        ],
        tenants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                trim: true
            }
        ],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            trim: true
        },
        interestedUsers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                trim: true
            }
        ],

    },
    {
        timestamps: true,
    }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;