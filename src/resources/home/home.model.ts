import { model, Schema } from "mongoose";

export const homeSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
  },
  { timestamps: true }
);

export const HomeModel = model("Home", homeSchema);
