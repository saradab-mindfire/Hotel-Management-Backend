const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const BookingSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            required: true,
            ref: 'Users'
        },
        hotelId: {
            type: ObjectId,
            required: true,
            ref: 'Hotel'
        },
        roomTypeId: {
            type: ObjectId,
            required: true,
            ref: 'RoomType'
        },
        roomId: {
            type: ObjectId,
            required: true,
            ref: 'Room'
        },
        bookingDate: {
            type: Date,
            required: true,
            default: new Date()
        },
        bookingId: {
            type: String,
            required: true
        },
        amountPaid: {
            type: Number,
            required: true
        },
        amountDue: {
            type: Number,
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        },
        GST: {
            type: Number,
            required: true
        },
        grandTotal: {
            type: Number,
            required: true
        },
        billingInformation: {
            type: Object,
            required: false
        },
        status: {
            type: String,
            enum: [ 'booked', 'cancelled' ],
            default: 'booked'
        },
        cancelledBy: {
            type: ObjectId
        }
    },
    { 
        collection: "Bookings",
         
    }
);

BookingSchema.virtual( 'cancelledByHotelUser', {
    ref: 'HotelUser',
    localField: 'cancelledBy',
    foreignField: '_id',
    justOne: true
} )

BookingSchema.virtual( 'cancelledByAdmin', {
    ref: 'AdminUser',
    localField: 'cancelledBy',
    foreignField: '_id',
    justOne: true
} )

BookingSchema.virtual( 'cancelledByCustomer', {
    ref: 'Customers',
    localField: 'cancelledBy',
    foreignField: '_id',
    justOne: true
} )


module.exports = mongoose.model("Booking", BookingSchema);