import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    default: "",
    trim: true,
  },
  lastName: {
    type: String,
    default: "",
    trim: true,
  },
  password: {
    type: String,
    default: "",
  },
  googleId: {
    type: String,
  },
  DOB: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  mobile_no: {
    type: String,
    default: "",

    trim: true,
  },
  address: [
    {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAuthorized: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  photo: {
    type: String,
    default:
      "https://res.cloudinary.com/dmrvutjac/image/upload/v1724162787/wauwymqrsbrde4ucb6zz.png",
  },
  verificationExpires: {
    type: Date,
    default: () => Date.now() + 5 * 60 * 1000, // 5 minutes from creation
  },
  timestamps: {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
});

userSchema.index({ verificationExpires: 1 }, { expireAfterSeconds: 0 }); // TTL index

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", function (next) {
  this.timestamps.updatedAt = Date.now();
  next();
});

const UserModel = mongoose.model("Users", userSchema);
export default UserModel;
