import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    MobileNo: {
        type: String,
        require: true,
        trim: true
    },
    pinCode: {
        type: String,
        require: true,
        trim: true
    },
    city: {
        type: String,
        require: true,
        trim: true
    },
    state: {
        type: String,
        require: true,
        trim: true
    },
}, {timestamps: true});

export default mongoose.model("user", userSchema);