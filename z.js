const mediumToMarkdown = require("./node_modules/medium-to-markdown");
fs = require("fs");

//  squoosh-cli --avif auto public/assets/blog/tech/20210615-the-hardest-production-bug/*.png -d public/assets/blog/tech/20210615-the-hardest-production-bug/

const POST_ID = "9eb80de6cfbf";
const url = "https://medium.com/p/" + POST_ID;
// Enter url here
mediumToMarkdown.convertFromUrl(url).then(function (markdown) {
  console.log("converting to z.md");
  fs.writeFile("z.md", markdown, "utf-8", console.log);
});
