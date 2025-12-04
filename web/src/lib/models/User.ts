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

  microsoft?: {
    accessToken?: string;
    refreshToken?: string;
    tokenExpiresAt?: Date;
  };

  settings: {
    renewalWindowDays: number;
    defaultTemplateId?: string | null;
  };

  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    // Basic Information
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    // Authentication
    password: {
      type: String,
      required: true,
      select: false,
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

    // Microsoft OAuth Tokens
    microsoft: {
      accessToken: { type: String, select: false },
      refreshToken: { type: String, select: false },
      tokenExpiresAt: { type: Date },
    },

    // User Settings
    settings: {
      renewalWindowDays: {
        type: Number,
        default: 90,
        min: 1,
        max: 365,
      },
      defaultTemplateId: {
        type: String,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);


// Password Hashing
UserSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;

  this.salt = crypto.randomBytes(16).toString("hex");

  // bcrypt cost factor 12 is a good balance
  this.password = await bcrypt.hash(this.password + this.salt, 12);
});

// Compare Password
UserSchema.methods.comparePassword = async function (
  candidate: string
): Promise<boolean> {
  return bcrypt.compare(candidate + this.salt, this.password);
};

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
