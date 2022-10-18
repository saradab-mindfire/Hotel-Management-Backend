const joi = require("joi");

const BookingSchemaValidation = joi.object({
    user: joi.string().trim(true).required(),
    hotelId: joi.string().trim(true).required(),
    roomTypeId: joi.string().trim(true).required(),
    roomId: joi.string().trim(true).required(),
    bookingDate: joi.date().required(),
    bookingId: joi.string().trim(true).required(),
    amountPaid: joi.number().required(),
    amountDue: joi.number().required(),
    totalAmount: joi.number().required(),
    GST: joi.number().required(),
    grandTotal: joi.number().required(),
    billingInformation: joi.object().optional()
.default([]),
status: joi.boolean().default('booked')
});

module.exports = {
    BookingSchemaValidation
}