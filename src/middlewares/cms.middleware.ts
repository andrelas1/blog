import toMarkdown from "@sanity/block-content-to-markdown";
import { SanityClient } from "@sanity/client";
import { NextFunction, RequestHandler } from "express";

type CmsMW = (client: SanityClient) => RequestHandler;

export const cmsMW: CmsMW = (client) => async (req, res, next) => {
  async function getBlogpostData(queryStr) {
    return await client.fetch(
      `*[_type=='post' && slug.current=='${queryStr}'] { title, slug, categories, mainImage, body}`
    );
  }

  async function getHomepageData() {
    const data = await client.fetch(
      `*[_type=='post'] { title, slug, categories, subtitle}`
    );
    return data;
  }

  async function getAboutMeData() {
    const data = await client.fetch(
      `*[_type=='aboutMe'] { 
        profile, 
        'experience': experience[]->{
          _id,
          title,
          description,
          'skills': skills[]->{name, level}
        },
        'languages': languages[]->{name,level},
        'skills': skills[]->{name, level},
        'educations': educations[]->{title,description}
      }`
    );
    return data;
  }

  const route = req.url.split("/");

  switch (route[1]) {
    case "blogposts":
      const queryStr = req.url.replace("/blogposts/", "");
      const blogposts = await getBlogpostData(queryStr);

      res.locals.cmsData = {
        ...blogposts[0],
        body: toMarkdown(blogposts[0].body),
      };
      break;
    case "about-me":
      const aboutMeData = await getAboutMeData();
      res.locals.cmsData = {
        ...aboutMeData[0],
      };
      break;
    default:
      const cmsData = await getHomepageData();
      res.locals.cmsData = cmsData.map((data) => ({
        ...data,
        slug: data.slug.current,
      }));
      break;
  }

  next();
};
