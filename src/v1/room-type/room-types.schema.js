const joi = require("joi");

const RoomTypeSchemaValidation = joi.object({
    hotelId: joi.string().trim(true).required(),
    roomType: joi.string().trim(true).required(),
    maxPersonLimit: joi.number().required(),
    additionalDetails: joi.object().optional()
.default([]),
    isActive: joi.boolean().default(true)
});

module.exports = {
    RoomTypeSchemaValidation
}