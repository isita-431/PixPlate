const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReceipeSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
      },
      incredients: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      }
    },
    {
      timestamps: true,
    }
  );

const Receipe = mongoose.model("Receipe", ReceipeSchema);

module.exports = Receipe