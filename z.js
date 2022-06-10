const mediumToMarkdown = require("./node_modules/medium-to-markdown");
fs = require("fs");

//  squoosh-cli --avif auto public/assets/blog/tech/20210615-the-hardest-production-bug/*.png -d public/assets/blog/tech/20210615-the-hardest-production-bug/

const url =
  "https://french-tech-lead.medium.com/the-missing-part-of-mediums-rest-api-5d377e02d5d9";
// Enter url here
mediumToMarkdown.convertFromUrl(url).then(function (markdown) {
  console.log("converting to z.md");
  fs.writeFile("z.md", markdown, "utf-8", console.log);
});
