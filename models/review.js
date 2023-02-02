const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        review: {
            type: String,
            required: true,
            trim: true,
        },
        rating: {
            type: Number,
            required: true,
            trim: true,
        },
        byUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
           
        },
        forUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
           
        },
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;