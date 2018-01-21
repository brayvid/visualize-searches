# most-searched-in-google-products
- Displays a frequency vs. time graph of the top&ast; words.
- Only searched words are counted, and common words like "the" and "a" are ignored.
- JQuery and p5.js are used via CDN.

&ast; The corpus is sorted into 16 equally spaced time-bins. The most frequent word in each bin is tracked throughout time. The number of bins can be changed in the code.

## Usage
- The required "MyActivity.html" file can be found at https://takeout.google.com/settings/takeout. Select: My Activity > Select specific activity data > (Choose a service), and follow the prompts.
- Place the MyActivity file in the directory that rankSearches.js, wordsToIgnore.js and index.html are in.
- Start a local web server from this directory. Here is one option: https://www.npmjs.com/package/http-server.
- Open the browser console, navigate to localhost, and wait a few seconds to a couple minutes.
