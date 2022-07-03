import { createHtmlFromMarkdown } from "./create-html-from-markdown";

const mockMdContent = `
# Title

something here

## Subtitle

something here
`;

describe("createHtmlFromMarkdown", () => {
  it("is defined", () => {
    expect(createHtmlFromMarkdown).toBeDefined();
  });

  it("should return an object with the content", () => {
    const result = createHtmlFromMarkdown(mockMdContent);
    expect(result).toEqual(
      `<h1 id="title">Title</h1>\n<p>something here</p>\n<h2 id="subtitle">Subtitle</h2>\n<p>something here</p>`
    );
  });
});
