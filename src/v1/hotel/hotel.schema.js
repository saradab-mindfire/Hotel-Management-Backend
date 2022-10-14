const joi = require("joi");

const HotelSchemaValidation = joi.object({
    name: joi.string().min(3).max(25).trim(true).required(),
    location: joi.string().min(3).max(25).trim(true).required(),
    address: joi.string().trim(true).required(),
    lat: joi.number().required(),
    lng: joi.number().required(),
    imageURL: joi.string().uri().min(8).trim(true).optional(),
    checkInTime: joi.string().optional(),
    checkOutTime: joi.string().optional()
.default([]),
    isActive: joi.boolean().default(false)
});

module.exports = {
    HotelSchemaValidation
}