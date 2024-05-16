import { Schema, model } from "mongoose";

const teachersSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "students",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
