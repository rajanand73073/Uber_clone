import mongoose, { Schema } from "mongoose";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "firstname must be atleast 3 characters long"],
    },
    lastname: {
      type: String,
      // required: true,
      trim: true,
      minlength: [3],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: [5, "Email must be at least 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [8, "Password must be atleast * characters long"],
  },
  vehicle: {
    plate: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Plate must be at least 3 characters long"],
    },
    color: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Plate must be at least 3 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      minlength: [1, "capacity must be atleast 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },

  location: {
    lat: {
      type: Number,
    },
    lon: {
      type: Number,
    },
  },
  status: {
    type: String,
    default: "inactive",
    enum: ["active", "inactive"],
  },
});

captainSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

captainSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
  next();
};

captainSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },

    process.env.JWT_SECRETS,

    {
      expiresIn: process.env.JWT_TOKEN_EXPIRY,
    },
  );
  return token;
};

export const Captain = mongoose.model("Captain", captainSchema);
