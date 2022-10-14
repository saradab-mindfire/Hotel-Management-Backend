const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const AdminUserSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            required: true,
            ref: 'Users'
        },
        userType: {
            type: String,
            enum: [ 'super-admin', 'admin', 'manager' ],
            default: 'manager'
        }
    },
    { collection: "AdminUsers" }
);

module.exports = mongoose.model("AdminUser", AdminUserSchema);