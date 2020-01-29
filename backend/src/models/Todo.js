const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
  {
    title: String,
    description: {
      type: String,
      required: true
    },
    author: String,
    completed: {
      type: Boolean,
      default: false
    },
    dueDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Todo", todoSchema);
