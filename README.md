# rank-youtube-search-words
- Generates an array where each element is [unique_word, frequency, [timestamps]], sorted by decreasing frequency.
- Only searched words are counted, not video titles. Common words are ignored.
- JQuery, p5.js and p5.dom.js are used via CDN.
- The process could take several minutes depending on the size of the MyActivity file.

# Instructions
- The required MyActivity file is available at https://takeout.google.com/settings/takeout by selecting My Activity > Select specific activity data > Youtube, and following the prompts.
- Place the MyActivity file in the directory that this file, index.html and wordsToIgnore.js are in.
- You'll need to start a local web server from this directory. One option here: https://www.npmjs.com/package/http-server.
- Open the browser console and navigate to localhost. Wait up to a few minutes for results if the MyHistory file is large.
