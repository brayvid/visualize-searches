# Display a graph of your top search terms in the browser
- Only searched words are counted, and common words like "the" and "a" are ignored. 
- Words are separated into bins by timestamp, and the most frequent word in each bin is tracked through time.
- Each word's count-per-bin is plotted with time. Clicking on a word toggles single-word mode.
- [p5](https://p5js.org/) and [JQuery](https://jquery.com/) are used via CDN.

## Usage
- The files study.js, ignore.js and index.html need to be served to your browser, in addition to a "MyActivity.html" file from Google. This can be found at https://takeout.google.com/settings/takeout. Select: My Activity > Select specific activity data > (Choose a service), and follow the prompts.
- Start a local web server from your working directory. Here is one server option: https://www.npmjs.com/package/http-server.
- Open the browser console, navigate to localhost, and wait a few seconds to a couple minutes depending on the size of the MyActivity file.

## Example
![](/examples/ex-1.png)

Single-word mode
![](/examples/ex-2.png)

