const { execSync } = require("child_process");

function createZipFile(filePath) {
  execSync(`
	zip -r website.zip ${filePath}
	`);
}

// function deployToNetlify(token, websiteName) {
//   // create a zip file of the website
//   const content = {};
//   const url = `https://api.netlify.com/api/v1/sites/${websiteName}.netlify.app/deploys`;
//   const options = {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     content,
//   };
//   return fetch(url, options);
// }

function deployToNetlify(token, name) {
  execSync(`
curl -H "Content-Type: application/zip" \
      -H "Authorization: Bearer ${token}" \
      --data-binary "@website.zip" \
			https://api.netlify.com/api/v1/sites/${name}.netlify.app/deploys
`);
}

function main() {
  createZipFile("./public");
  deployToNetlify(
    process.env.NETLIFY_AUTH_TOKEN,
    process.env.NETLIFY_WEBSITE_NAME
  );
}

main();
