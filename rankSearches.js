/*  
  - A Youtube "MyActivity.html" file from https://takeout.google.com/settings/takeout is required.
  - Place the MyActivity file in the directory that this file, index.html and wordsToIgnore.js are in.
  - Start a local web server from this directory. Navigate to localhost and open the browser console.
  - Wait up to a few minutes if the MyHistory file is large.
*/

var rank = function(p){

  p.setup = function(){
    p.noCanvas();
    p.noLoop();

    var searches_with_dates = [];
    var selected_data;

    // Most recent entries to scan for searches.
    var len = document.querySelector("#data-element > div").childElementCount;

    var list_from_file = document.querySelector("#data-element > div");
    
    if(list_from_file == null){
      console.log("No file found, exiting.");
      return;
    }

    console.log("Scanning the latest "+len+" entries for searches.");

    for(var i = 1; i < len + 1; i++){
      console.log("Running...("+i+"/"+len+")");
      selected_data = list_from_file.querySelector("div:nth-child("+i+") > div > div:nth-child(2)");
      if(selected_data.innerHTML.indexOf("Searched") != -1){
        var search_and_date = [selected_data.querySelector("a").innerHTML, Date.parse(selected_data.innerHTML.match("(?<=<br>).*")[0])];
        console.log("Match!");
        searches_with_dates.push(search_and_date);
      }
    };

    console.log("Found "+searches_with_dates.length+" searches.");

    var flattened_words_with_dates = [];

    for(var i = 0; i < searches_with_dates.length; i++){
        var words_in_search = searches_with_dates[i][0].split(/(?:,| )+/);  // https://stackoverflow.com/a/650031
        var search_time_ms = searches_with_dates[i][1];

        for(var j = 0; j < words_in_search.length; j++){
          flattened_words_with_dates.push([words_in_search[j], search_time_ms]);
        }
    };

    var unique_words = [];
    var frequencies = {};
    var dates = {};

    var ignored_word_count = 0;


    for(var i = 0; i < flattened_words_with_dates.length; i++){
      var active_word = flattened_words_with_dates[i][0];
      var active_date = flattened_words_with_dates[i][1];

      if(!(words_to_ignore.includes(active_word))){   // words_to_ignore defined in external file
        if(!(unique_words.includes(active_word))){
          // Word has not appeared yet
          unique_words.push(active_word);
          frequencies[active_word] = 1;
          dates[active_word] = [active_date];
        }else{
          // Word has appeared before
          frequencies[active_word]++;
          dates[active_word].push(active_date);
        }
      }else{
        ignored_word_count++;
      }
    };
    console.log("Total words: "+flattened_words_with_dates.length+"\nUnique words: "+unique_words.length+"\nIgnored words: "+ignored_word_count);

    var words_arr = [];

    for(var key in frequencies){
      if(frequencies.hasOwnProperty(key)){
        words_arr.push([key, frequencies[key], dates[key]]);
      }
    };

    // Sort words by frequency value
    var sorted_words = words_arr.sort(function(a, b){return a[1]-b[1]; }); // https://gist.github.com/umidjons/9614157
    sorted_words.reverse();
    
    console.log("Printing results and saving JSON file.");
    console.log(sorted_words);
    p.save(sorted_words,"youtube_searches_ranked.json");


  };  // end p.setup()

return;
};  // end rank()


