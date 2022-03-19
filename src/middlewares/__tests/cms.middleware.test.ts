import { cmsMW } from "../cms.middleware";

describe("CMS MIDDLEWARE", () => {
  const client = {
    fetch: jest.fn(
      (query) =>
        new Promise((resolve, reject) => {
          resolve([
            {
              categories: [],
              mainImage: {},
              title: {},
              body: [],
              slug: { current: "" },
            },
          ]);
        })
    ),
  };

  const reqSpy = { url: "/" };
  const resSpy = { cu: "", locals: { cmsData: {} } };
  const nextSpy = jest.fn();

  // do mocks
  it("should be defined", () => {
    expect(typeof cmsMW).toEqual("function");
  });

  it("calls next", async () => {
    await cmsMW(client as any)(reqSpy as any, resSpy as any, nextSpy);

    expect(nextSpy).toHaveBeenCalled();
  });

  it("injects the response from the cms in res.locals", async () => {
    await cmsMW(client as any)(reqSpy as any, resSpy as any, nextSpy);

    expect(resSpy.locals.cmsData).toEqual([
      {
        categories: [],
        mainImage: {},
        slug: "",
        title: {},
        body: [],
      },
    ]);
  });

  it("fetches the data from the cms according to the slug", async () => {
    reqSpy.url = "/blogposts/test-2";

    const client = {
      fetch: jest.fn().mockResolvedValue([{ body: "" }]),
    };

    await cmsMW(client as any)(reqSpy as any, resSpy as any, nextSpy);

    expect(client.fetch).toHaveBeenCalledWith(
      `*[_type=='post' && slug.current=='test-2'] { title, slug, categories, mainImage, body}`
    );
  });
});
