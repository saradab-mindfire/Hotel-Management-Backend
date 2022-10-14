const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const UserSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            required: true,
            ref: 'Users'
        }
    },
    { collection: "Customers" }
);

module.exports = mongoose.model("Customers", UserSchema);