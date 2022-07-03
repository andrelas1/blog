import fs from "fs";

import { writeHtmlFileToPublicFolder } from "./write-html-file-to-public-folder";

// jest.mock("fs", () => ({
//   writeFileSync: jest.fn(),
// }));

jest.mock("fs");
jest.mock("ejs", () => ({
  renderFile: jest.fn((a, b, c) => {
    c(null, "<h1>Hello</h1>");
  }),
}));

describe("writeHtmlFilesToPublicFolder", () => {
  it("is defined", () => {
    expect(writeHtmlFileToPublicFolder).toBeDefined();
  });

  it("it calls writeFileSync with the correct parameters", () => {
    const mockBlogpost = {
      url: "test-url",
      title: "test-title",
      subtitle: "test-subtitle",
      content: "test-content",
    };

    const mockStaticsPath = "test-statics-path";
    const mockPublicPath = "test-public-path/";

    writeHtmlFileToPublicFolder(mockStaticsPath, mockPublicPath, mockBlogpost);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      mockPublicPath,
      expect.any(String),
      expect.any(Object)
    );
  });
});
