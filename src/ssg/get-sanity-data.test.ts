import {
  getBlogpostData,
  getAboutMeData,
  getHomepageData,
} from "./get-sanity-data";

describe("when fetching from sanity", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("blogpost data - should call the sanity client with the correct parameters", async () => {
    const params =
      "*[_type=='post'] { title, slug, categories, mainImage, body, subtitle }";

    const spy = { fetch: jest.fn() };
    await getBlogpostData(spy);

    expect(spy.fetch).toHaveBeenCalledWith(params);
  });

  it("get homepage data - should call the sanity client with the correct parameters", async () => {
    const params = "*[_type=='post'] { title, slug, categories, subtitle }";

    const spy = { fetch: jest.fn() };

    await getHomepageData(spy);

    expect(spy.fetch).toHaveBeenCalledWith(params);
  });

  it(" get about me data - should call the sanity client with the correct parameters", async () => {
    const params = `*[_type=='aboutMe'] { 
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
      }`;

    const spy = { fetch: jest.fn() };

    await getAboutMeData(spy);

    expect(spy.fetch).toHaveBeenCalledWith(params);
  });
});
