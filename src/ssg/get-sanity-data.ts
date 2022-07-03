export async function getBlogpostData(client) {
  return await client.fetch(
    `*[_type=='post'] { title, slug, categories, mainImage, body, subtitle }`
  );
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
