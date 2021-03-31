const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Mention = require("./mentionModel");

const userSchema = mongoose.Schema(
  {
    companies: {
      type: Array,
      required: true,
    },
    activeCompany: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    reportEmail: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    platforms: {
      reddit: { type: Boolean, required: true, default: true },
      twitter: { type: Boolean, required: true, default: false },
      facebook: { type: Boolean, required: true, default: false },
      amazon: { type: Boolean, required: true, default: false },
      forbes: { type: Boolean, required: true, default: false },
      shopify: { type: Boolean, required: true, default: false },
      businessinsider: { type: Boolean, required: true, default: false },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.statics.getAllCompanies = async function () {
  return await this.distinct("name").flat();
};

userSchema.methods.getTopFiveMentions = async function () {
  return await Mention.find({ company: this.activeCompany })
    .sort({ popularity: -1 })
    .limit(5);
};

module.exports = mongoose.model("User", userSchema);
