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
            required: [true, "The First Name is Empty"],
            trim: true,
            lowercase: true,
            minlength: [3, "Last Name is too Short"],
            maxlength: [50, "Last Name Exceeds Maximum Length"]
        },
        lastName: {
            type: String,
            required: [true, "The Last Name is Empty"],
            trim: true,
            lowercase: true,
            minlength: [3, "Last Name is too Short"],
            maxlength: [50, "Last Name Exceeds Maximum Length"]
        },
        email: {
            type: String,
            required: [true, "Email field is Empty"],
            unique: true,
            lowercase: true
        },
        mobile: {
            type: String,
            required: [true, "Mobile No. is Required"],
            unique: true
        },
        salt: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            minlength: [6, "Password is too Short"],
            maxlength: [16, "Password Exceeds Maximum Length"]
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