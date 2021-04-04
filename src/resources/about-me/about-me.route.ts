import * as ejs from "ejs";
import { ExperienceModel, LanguageModel } from ".";

import {
  AboutMeModel,
  EducationModel,
  SkillModel,
  StackModel,
} from "./about-me.model";

declare module "mongoose" {
  export interface Document {
    title?: string;
    description?: string;
    _id: Object;
    type?: string;
    stack?: { ref: Object }[];
    technology?: string;
    name?: string;
    level?: string;
  }
}

export async function aboutMeRouteController(req, res, next) {
  const aboutMe = (await AboutMeModel.find({}))[0];
  const experiences = await ExperienceModel.find({});
  const languages = await LanguageModel.find({});
  const skills = await SkillModel.find({});
  const stacks = await StackModel.find({});

  const templateData = {
    profile: aboutMe.get("profile"),
    workExperiences: experiences
      .filter((experience) => experience.type === "work")
      .filter((experience) =>
        aboutMe
          .get("experiences")
          .some(
            (aboutMeExp) =>
              aboutMeExp.ref.toString() === experience._id.toString()
          )
      )
      .map(({ title, description, _id, type, stack: experienceStack }) => {
        return {
          title,
          description,
          _id,
          type,
          stack: stacks
            .filter((stack) =>
              experienceStack.some(
                (s) => s.ref.toString() === stack._id.toString()
              )
            )
            .map((s) => ({ technology: s.technology })),
        };
      }),
    educationExperiences: experiences
      .filter((experience) => experience.type === "education")
      .filter((education) =>
        aboutMe
          .get("experiences")
          .some(
            (aboutMeExp) =>
              aboutMeExp.ref.toString() === education._id.toString()
          )
      )
      .map(({ title, description, _id, type, stack: experienceStack }) => {
        return {
          title,
          description,
          _id,
          type,
        };
      }),
    skills: skills
      .filter((skill) =>
        aboutMe
          .get("skills")
          .some(
            (aboutMeSkill) =>
              aboutMeSkill.ref.toString() === skill._id.toString()
          )
      )
      .map(({ name, level }) => ({ name, level })),
    languages: languages
      .filter((language) =>
        aboutMe
          .get("languages")
          .some(
            (aboutMeLanguage) =>
              aboutMeLanguage.ref.toString() === language._id.toString()
          )
      )
      .map(({ name, level }) => ({
        name,
        level,
      })),
  };

  ejs.renderFile(res.locals.templatePath, templateData, (err, template) => {
    if (err) {
      next(err);
    } else {
      res.end(template);
    }
  });
}
