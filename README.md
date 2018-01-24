# Find and graph frequent searches from a MyActivity file
- Only searched words are counted, and common words like "the" and "a" are ignored. 
- The words are separated into 16 bins by timestamp, and the most frequent word in each bin is tracked through time.
- Displays a frequency vs. time graph of the words, individually or all at once (click a word to toggle).
- JQuery and p5.js are used via CDN.

## Usage
- The required "MyActivity.html" file can be found at https://takeout.google.com/settings/takeout. Select: My Activity > Select specific activity data > (Choose a service), and follow the prompts.
- Place the MyActivity file in the directory that myFun.js, wordsToIgnore.js and index.html are in.
- Start a local web server from this directory. Here is one option: https://www.npmjs.com/package/http-server.
- Open the browser console, navigate to localhost, and wait a few seconds to a couple minutes.

## Example
![](/example.jpg)
