const mediumToMarkdown = require("./node_modules/medium-to-markdown");
fs = require("fs");

//  squoosh-cli --avif auto public/assets/blog/tech/20210615-the-hardest-production-bug/*.png -d public/assets/blog/tech/20210615-the-hardest-production-bug/

const url =
  "https://french-tech-lead.medium.com/build-a-web-bot-in-2-minutes-ab278bd63e6c";
// Enter url here
mediumToMarkdown.convertFromUrl(url).then(function (markdown) {
  console.log("converting to z.md");
  fs.writeFile("z.md", markdown, "utf-8", console.log);
});
