const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ["oshin", "alan", "alex", "max", "nick", "dustin", "luis"],
    unique: true,
  },
  superlative: [
    {
      type: Schema.Types.ObjectId,
      ref: "Superlative",
    },
  ],
});

const User = model("User", userSchema);

module.exports = User;
