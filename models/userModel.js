import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: "lastName",
    },
    location: {
        type: String,
        default: "my city",
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    avatar: String,
    avatarPublicId: String,
});

userSchema.methods.toJSON = function () {
    var object = this.toObject();
    delete object.password;
    return object;
};

export default mongoose.model("User", userSchema);
