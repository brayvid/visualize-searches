/*  
    - This program needs a Youtube "MyActivity.html" file from Google. You can find yours at <https://takeout.google.com/settings/takeout>.
    - Copy "MyActivity.html" into the directory that this file and the index.html file are in.
    - Start a local web server from the same directory. Go to localhost and open the console.
    - Wait a few seconds to several minutes, depending on the size of your "MyActivity.html" file.
*/

var rank = function(p){

  p.setup = function(){
    p.noCanvas();
    p.noLoop();

    var searches_with_dates = [];
    var selected_data;

    // Most recent entries to scan for searches. Default is everything.
    var len = document.querySelector("#data-element > div").childElementCount;

    console.log("Scanning the latest "+len+" entries for searches.");

    for(var i = 1; i < len + 1; i++){
      console.log("Running...("+i+"/"+len+")");
      selected_data = document.querySelector("#data-element > div > div:nth-child("+i+") > div > div:nth-child(2)");
      if(selected_data.innerHTML.indexOf("Searched") != -1){
        var search_and_date = [document.querySelector("#data-element > div > div:nth-child("+i+") > div > div:nth-child(2) > a").innerHTML, Date.parse(selected_data.innerHTML.match("(?<=<br>).*")[0])];
        console.log("Match!");
        searches_with_dates.push(search_and_date);
      }
    };

    console.log("Searches found: "+searches_with_dates.length);

    var flattened_words_with_dates = [];

    for(var i = 0; i < searches_with_dates.length; i++){
        var words_in_search = searches_with_dates[i][0].split(/(?:,| )+/);
        var search_time_ms = searches_with_dates[i][1];

        for(var j = 0; j < words_in_search.length; j++){
          flattened_words_with_dates.push([words_in_search[j], search_time_ms]);
        }
    };

    console.log("Total words used: "+flattened_words_with_dates.length);
    
    var unique_words = [];
    var ignored_word_count = 0;

    var stop_words = words_to_ignore; // from global variable in external file
    
    var frequencies = {};
    var dates = {};

    for(var i = 0; i < flattened_words_with_dates.length; i++){
      var active_word = flattened_words_with_dates[i][0];
      var active_date = flattened_words_with_dates[i][1];

      if(!(stop_words.includes(active_word))){
        
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
    }
    console.log("Unique words: "+unique_words.length);
    console.log("Ignore count: "+ignored_word_count);

    var words_arr = [];

    for(var key in frequencies){
      if(frequencies.hasOwnProperty(key)){
        words_arr.push([key, frequencies[key], dates[key]]);
      }
    }
    // sort items by value
    var sorted_words = words_arr.sort(function(a, b){return a[1]-b[1]; }); // https://gist.github.com/umidjons/9614157
    sorted_words.reverse();
    console.log("Printing results and saving as JSON.")
    console.log(sorted_words);

    p.save(sorted_words,"youtube_searches_ranked.json");

  };

};


