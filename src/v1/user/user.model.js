const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema(
    {
        uuid: {
            type: String,
            required: true,
            default: uuidv4(),
            trim: true
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            lowercase: true
        },
        mobile: {
            type: String,
            required: true,
            unique: true
        },
        salt: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        emailVerified: {
            type: Boolean,
            default: false
        },
        mobileVerified: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            enum: [ 'in-active', 'active', 'blocked', 'deleted' ],
            default: 'in-active'
        },
        additionalInfo: {
            type: Object
        }
    },
    { collection: "Users" }
);

module.exports = mongoose.model("Users", UserSchema);