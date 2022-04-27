const mediumToMarkdown = require('./node_modules/medium-to-markdown');
 fs = require('fs');

 //  squoosh-cli --avif auto public/assets/blog/tech/20210615-the-hardest-production-bug/*.png -d public/assets/blog/tech/20210615-the-hardest-production-bug/

const url = 'https://medium.com/geekculture/the-weirdest-bug-that-i-faced-during-my-software-engineering-career-4278fa40215f';
// Enter url here
mediumToMarkdown.convertFromUrl(url)
.then(function (markdown) {
  console.log("converting to z.md");
  fs.writeFile('z.md', markdown, 'utf-8',console.log);
});

