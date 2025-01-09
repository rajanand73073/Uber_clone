import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        trim: true,
        minlength: [3],
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
      required: [true, "Password is required"],
      trim: true,
      // selects: false,
      minlength: [8, "paasword must be at least 8 characters long"],
    },
    socketId: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
  next()
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRETS,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRY,
    }
  );

  return token;
};

export const User = mongoose.model("User", userSchema);
