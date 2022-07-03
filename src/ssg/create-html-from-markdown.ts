import showdown from "showdown";

type CreateHtmlFromMarkdown = (markdownContent: string) => string;

export const createHtmlFromMarkdown: CreateHtmlFromMarkdown = (
  markdownContent
) => {
  const converter = new showdown.Converter();
  const htmlContent = converter.makeHtml(markdownContent);
  return htmlContent;
};
