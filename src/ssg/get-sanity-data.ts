export async function getBlogpostData(client) {
  const data = await client.fetch(
    `*[_type=='post'] { _id, title, slug, categories, mainImage, body, subtitle }`
  );
  return data.filter((post) => post._id.indexOf("drafts") === -1);
}

export async function getHomepageData(client) {
  const data = await client.fetch(
    `*[_type=='post'] { title, slug, categories, subtitle }`
  );
  return data;
}

export async function getAboutMeData(client) {
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
