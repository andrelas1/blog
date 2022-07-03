import { normalizeToTemplateModel } from "./normalize-to-template-model";

describe("normalizeToTemplateModel", () => {
  describe("convert the cms body response to html content", () => {
    // check if the showdown converter was called
    // check if the makeHtml function was called
  });

  describe("converting the cms response to the template model for EJS", () => {
    it("should be defined", () => {
      expect(normalizeToTemplateModel).toBeDefined();
    });

    it("should return the model with the correct properties", () => {
      const templateMock = `
								<h1>title</h1>
								<div>some div</div>
					`;
      // add mock here from the sanity data
      const blogpostsFromCms = [
        {
          title: "title",
          subtitle: "subtitle",
          body: templateMock,
        },
      ];
      // add titles and subtitles here
      const expectedModels = [
        {
          title: "title",
          subtitle: "subtitle",
          content: templateMock,
        },
      ];

      expect(normalizeToTemplateModel(blogpostsFromCms)).toEqual(
        expectedModels
      );
    });
  });
});
