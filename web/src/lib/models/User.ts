import mongoose, { Schema, Document } from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  salt: string;
  role: "user" | "admin";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // prevent leaks
    },
    salt: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Pre-save: generate salt + hash password
UserSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;

  // Generate a random salt
  this.salt = crypto.randomBytes(16).toString("hex");

  // Hash password + salt using bcrypt
  this.password = await bcrypt.hash(this.password + this.salt, 10);
});

// Method to compare password
UserSchema.methods.comparePassword = async function (
  candidate: string
): Promise<boolean> {
  return bcrypt.compare(candidate + this.salt, this.password);
};

// Avoid model overwrite errors
export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
