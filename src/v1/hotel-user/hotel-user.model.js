const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const HotelUserSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            required: true,
            ref: 'Users'
        },
        userType: {
            type: String,
            enum: [ 'owner', 'manager', 'receptionist' ],
            default: 'receptionist'
        },
        associatedWith: {
            type: ObjectId,
            required: false,
            ref: 'Hotel'
        }
    },
    { collection: "HotelUsers" }
);

module.exports = mongoose.model("HotelUser", HotelUserSchema);