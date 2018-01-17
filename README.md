# myactivity-search-term-frequency
- Generates an array where each element is [unique_word, frequency, [timestamps]], sorted by decreasing frequency.
- Only searched words are counted. Common words are ignored.
- JQuery 1.12.4 is used via CDN.

## Instructions
- The required "MyActivity.html" file is found at https://takeout.google.com/settings/takeout. Select: My Activity > Select specific activity data > (Choose a service), and follow the prompts.
- Place the MyActivity file in the directory that this file, index.html and wordsToIgnore.js are in.
- Start a local web server from this directory. Here is one option: https://www.npmjs.com/package/http-server.
- Open the browser console, navigate to localhost, and wait a few seconds to a couple minutes.
