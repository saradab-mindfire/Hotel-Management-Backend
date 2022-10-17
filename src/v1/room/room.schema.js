const joi = require("joi");

const RoomSchemaValidation = joi.object({
    hotelId: joi.string().trim(true).required(),
    displayName: joi.string().trim(true).required(),
    description: joi.string().trim(true).required(),
    roomType: joi.string().trim(true).required(),
    defaultPrice: joi.number().required()
.default([]),
    isActive: joi.boolean().default(true)
});

module.exports = {
    RoomSchemaValidation
}