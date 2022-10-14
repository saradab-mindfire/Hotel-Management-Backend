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
        }
    },
    { collection: "RoomTypes" }
);

module.exports = mongoose.model("RoomType", RoomTypesSchema);