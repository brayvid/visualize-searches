# Graph the terms you searched most over time
- Only searched words are counted, and common words like "the" and "a" are ignored. 
- The words are separated into 16 bins by timestamp, and the most frequent word in each bin is tracked through time.
- A frequency vs. time graph of each frequent word is displayed. Clicking a word toggles single-word mode.
- JQuery and p5.js are used via CDN.

## Usage
- The myFun.js, wordsToIgnore.js, index.html files need to be served to your browser, in addition to a A "MyActivity.html" file. This can be found at https://takeout.google.com/settings/takeout. Select: My Activity > Select specific activity data > (Choose a service), and follow the prompts.
- Place the MyActivity file in the same directory as the others.
- Start a local web server from this directory. Here is one server option: https://www.npmjs.com/package/http-server.
- Open the browser console, navigate to localhost, and wait a few seconds to a couple minutes.

## Example
Labeled buttons will appear at the top of the graph window, but they have been omitted here.
![](/examples/ex1.jpg)

Single-word mode
![](/examples/ex2.jpg)

