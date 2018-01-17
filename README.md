# rank-youtube-searches
- Finds all unique search terms in a Youtube "MyActivity.html" file and ranks each term by frequency of use.
- Generates an array of elements like [unique_word, frequency, [timestamps]] and sorts the array by decreasing frequency.
- The MyActivity file is available at https://takeout.google.com/settings/takeout by selecting My Activity > Select specific activity data > Youtube, and following the prompts.
- Only searched words are counted, not video titles. Common words are ignored.
- JQuery, p5.js and p5.dom.js are used via CDN.
- The process could take several minutes depending on the size of the MyActivity file.
