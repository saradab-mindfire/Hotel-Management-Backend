const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const NotificationSchema = new mongoose.Schema(
    {
        bookingRefId: {
            type: ObjectId,
            required: false,
            ref: 'Booking'
        },
        user: {
            type: ObjectId,
            required: true,
            ref: 'Customers'
        },
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["sent", "read", "removed"]
        }
    },
    { collection: "Notifications" }
);

module.exports = mongoose.model("Notification", NotificationSchema);