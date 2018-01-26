# Graph your top search terms in the browser
- Only searched words are counted, and common words like "the" and "what" are ignored. 
- Words are separated into bins by timestamp, and the most frequent word in each bin is tracked through time.
- Each frequent word's count-per-bin is plotted with time. Clicking on a word toggles its graph on and off.
- [p5](https://p5js.org/) and [JQuery](https://jquery.com/) are used via CDN links in the index.html file.

## Usage
- The files study.js, ignored.js and index.html need to be served to your browser, in addition to a "MyActivity.html" file from Google. This can be found at https://takeout.google.com/settings/takeout. Select: My Activity > Select specific activity data > (Choose a service), and follow the prompts.
- Start a local web server from your working directory. Here is one option: https://www.npmjs.com/package/http-server.
- Open the browser console, navigate to localhost, and wait a few seconds to a couple minutes for the window to appear, depending on the size of the MyActivity file.

## Example (Youtube)
![](/examples/example-1.png)

![](/examples/example-2.png)

![](/examples/example-3.png)

