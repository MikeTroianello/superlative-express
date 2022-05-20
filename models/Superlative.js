const { Schema, model } = require("mongoose");

const superlativeSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  creator: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  vote: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
  ],
});

const Superlative = model("Superlative", superlativeSchema);

module.exports = Superlative;
