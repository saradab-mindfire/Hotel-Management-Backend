const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const RoomSchema = new mongoose.Schema(
    {
        hotelId: {
            type: ObjectId,
            required: true,
            ref: 'Users'
        },
        displayName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        roomType: {
            type: ObjectId,
            required: false,
            ref: 'RoomType'
        },
        defaultPrice: {
            type: Number,
            required: true,
            default: 0
        },
        isActive: {
            type: Boolean,
            default: false
        },
        createdBy: {
            type: ObjectId,
            ref: 'HotelUser',
            required: true
        }
    },
    { collection: "Rooms" }
);

module.exports = mongoose.model("Room", RoomSchema);