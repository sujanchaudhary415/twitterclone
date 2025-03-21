import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    proffession:{
      type: String,
      required: true,
    },
    location:{
      type: String,
      required: true,
    },
    joinedAt:{
      type: Date,
      default: Date.now,
    },
    followers:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    following:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = async function () {
    const token=jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
    return token;
}

userSchema.statics.hashPassword=async function (password){
    const salt=await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

userSchema.methods.comparePassword=async function(password){
    return await  bcrypt.compare(password, this.password);
}

const userModel = mongoose.model("User", userSchema);

export default userModel;
