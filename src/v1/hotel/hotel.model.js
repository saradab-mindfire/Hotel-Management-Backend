const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const HotelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        },
        imageURL: {
            type: String,
            required: false
        },
        isActive: {
            type: Boolean,
            default: false
        },
        checkInTime: {
            type: String,
            default: "12:00 PM"
        },
        checkOutTime: {
            type: String,
            default: "11:00 AM"
        },
        createdBy: {
            type: ObjectId,
            required: true,
            ref: 'HotelUser'
        },
    },
    { 
        collection: "Hotels",
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

const HotelModel = mongoose.model("Hotel", HotelSchema);

module.exports = HotelModel;