import { model, Schema } from "mongoose";

const RelationSchema = new Schema({
  ref: { type: Schema.Types.ObjectId },
  id: Schema.Types.ObjectId,
  kind: { type: String },
});

const StackSchema = new Schema({
  technology: { type: String, required: true },
});

const ExperienceSchema = new Schema({
  _id: Schema.Types.ObjectId,
  type: { type: String, required: true, enum: ["education", "work"] },
  description: { type: String, required: true },
  title: { type: String, required: true },
  stack: [RelationSchema],
});

const LanguageSchema = new Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
});

const SkillSchema = new Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
});

export const aboutMeSchema = new Schema(
  {
    site: { type: String },
    profile: { type: String, required: true },
    skills: [RelationSchema],
    experiences: [RelationSchema],
    languages: [RelationSchema],
  },
  { timestamps: true }
);

// 616e9cceea34b345fcb3fd3b
export const AboutMeModel = model("about_me", aboutMeSchema);
// eslint-disable-next-line no-unused-vars
export const ExperienceModel = model(
  "components_about_me_experience",
  ExperienceSchema
);
export const StackModel = model("components_about_me_stack", StackSchema);
export const LanguageModel = model(
  "components_about_me_language",
  LanguageSchema
);
export const EducationModel = model(
  "components_about_me_education",
  ExperienceSchema
);
export const SkillModel = model("components_skill_skill", SkillSchema);
