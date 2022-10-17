const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const RoomInventorySchema = new mongoose.Schema(
    {
        roomId: {
            type: ObjectId,
            required: true,
            ref: 'Room'
        },
        currentPrice: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    },
    { 
        collection: "RoomInventory",
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

module.exports = mongoose.model("RoomInventory", RoomInventorySchema);