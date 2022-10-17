const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const RoomTypesSchema = new mongoose.Schema(
    {
        hotelId: {
            type: ObjectId,
            required: true,
            ref: 'Hotel'
        },
        roomType: {
            type: String,
            enum: [ 'A/C', 'Non-A/C' ],
            default: 'receptionist'
        },
        maxPersonLimit: {
            type: Number,
            required: true,
            default: 2
        },
        additionalDetails: {
            type: Object,
            required: false
        },
        isActive: {
            type: Boolean,
            default: true
        },
        createdBy: {
            type: ObjectId,
            ref: 'Hotel',
            required: true
        }
    },
    { 
        collection: "RoomTypes",
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

module.exports = mongoose.model("RoomType", RoomTypesSchema);