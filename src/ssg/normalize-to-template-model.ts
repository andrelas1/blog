type TemplateModel = {
  title: string;
  subtitle: string;
  content: string;
};

// TODO: add to a global ts
type SanityResponse = {
  title: string;
  subtitle: string;
  body: any;
};

type NormalizeToTemplateData = (cmsModels: SanityResponse[]) => TemplateModel[];

export const normalizeToTemplateModel: NormalizeToTemplateData = (
  cmsModels: SanityResponse[]
) => {
  return cmsModels.map((cmsModel) => ({
    title: cmsModel.title,
    subtitle: cmsModel.subtitle,
    content: cmsModel.body,
  }));
};
