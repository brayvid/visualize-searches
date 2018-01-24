# Find and graph frequent searches
- Only searched words are counted, and common words like "the" and "a" are ignored. 
- The words are separated into 16 bins by timestamp, and the most frequent word in each bin is tracked through time.
- A frequency vs. time graph of each frequent word is displayed. Clicking a word toggles single-view mode.
- JQuery and p5.js are used via CDN.

## Usage
- A directory containing myFun.js, wordsToIgnore.js and index.html needs to be served (by you) to your browser.
- The required "MyActivity.html" file can be found at https://takeout.google.com/settings/takeout. Select: My Activity > Select specific activity data > (Choose a service), and follow the prompts. Place the MyActivity file in the directory.
- Start a local web server from the directory. Here is one option: https://www.npmjs.com/package/http-server.
- Open the browser console, navigate to localhost, and wait a few seconds to a couple minutes.

## Example
The words are normally displayed but they have been omitted here. There would be a row of buttons at the top of the graph window.
![](/example1.jpg)
![](/example2.jpg)

