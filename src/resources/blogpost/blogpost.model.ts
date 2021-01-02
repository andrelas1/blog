import { model, Schema } from "mongoose";

export const blogpostSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      enum: ["webdev", "movies", "thoughts", "personal"],
      required: true,
    },
    published: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const BlogpostModel = model("Blogpost", blogpostSchema);
