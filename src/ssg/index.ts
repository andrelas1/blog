// something triggers this script TO DO
// the script then connects to sanity and get all blogposts OK
// all blogposts are then converted to markdown OK
// index and about-me page converted to markdown OK
// the markdown is then passed to ejs to generate the html with the data OK
// build the statics with WebPack
// the html files are ready to be deployed
// the html is generated with the css and js

import sanityClient from "@sanity/client";
import toMarkdown from "@sanity/block-content-to-markdown";

import {
  getAboutMeData,
  getBlogpostData,
  getHomepageData,
} from "./get-sanity-data";
import { createHtmlFromMarkdown } from "./create-html-from-markdown";
import { writeHtmlFileToPublicFolder } from "./write-html-file-to-public-folder";

type SanityCredentials = {
  projectId: string;
  dataset: string;
  token: string;
  apiVersion: string;
};
type GenerateStatics = (sanityCredentials: SanityCredentials) => void;

const staticsPath = process.cwd() + "/statics";
const outputFolder = process.cwd() + "/src/ssg/html-files";

const generateStatics: GenerateStatics = async ({
  projectId,
  dataset,
  token,
  apiVersion,
}) => {
  // connect to sanity
  const client = sanityClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false, // `false` if you want to ensure fresh data
  });

  const blogpostsFromApi = await getBlogpostData(client);

  const blogposts = blogpostsFromApi.map(({ body, slug, title, subtitle }) => ({
    url: slug.current,
    title,
    subtitle,
    content: createHtmlFromMarkdown(toMarkdown(body)),
  }));

  const indexFromApi = await getHomepageData(client);

  const index = indexFromApi.reduce((acc, blogpost) => {
    return {
      title: "andrelas1",
      subtitle: "Thoughts and ideas about books and a few other things.",
      site: "andrelas1",
      blogposts: acc.blogposts
        ? [...acc.blogposts, { ...blogpost, slug: blogpost.slug.current }]
        : [{ ...blogpost, slug: blogpost.slug.current }],
    };
  }, {});

  const { profile, experience, languages, skills, educations } = (
    await getAboutMeData(client)
  )[0];

  const aboutMe = {
    profile,
    workExperiences: experience.map((exp) =>
      exp.skills ? exp : { ...exp, skills: [] }
    ),
    educationExperiences: educations,
    skills,
    languages,
  };

  // write files to public folder
  blogposts.forEach((blogpost) => {
    writeHtmlFileToPublicFolder(
      `${staticsPath}/blogpost.ejs`,
      `${outputFolder}/${blogpost.url}.html`,
      blogpost
    );
  });

  writeHtmlFileToPublicFolder(
    `${staticsPath}/index.ejs`,
    `${outputFolder}/index.html`,
    index
  );

  writeHtmlFileToPublicFolder(
    `${staticsPath}/about-me.ejs`,
    `${outputFolder}/about-me.html`,
    aboutMe
  );
};

generateStatics({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2022-03-19",
  token: process.env.SANITY_TOKEN,
});
