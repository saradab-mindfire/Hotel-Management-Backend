const joi = require("joi");

const UserSchemaValidation = joi.object({
    firstName: joi.string().alphanum().min(3).max(25).trim(true).required(),
    lastName: joi.string().alphanum().min(3).max(25).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    mobile: joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
    password: joi.string().min(8).trim(true).optional(),
    additionalInfo: joi.object().optional(),
    emailVerified: joi.boolean().optional(),
    mobileVerified: joi.boolean().optional(),
    status: joi.string().optional()
.default([]),
    status: joi.string().default('active'),
});

module.exports = {
    UserSchemaValidation
}