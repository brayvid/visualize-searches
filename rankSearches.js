/*  
  - A Youtube "MyActivity.html" file from https://takeout.google.com/settings/takeout is required.
  - Place the MyActivity file in the directory that this file, index.html and wordsToIgnore.js are in.
  - Start a local web server from this directory. Here is one option: https://www.npmjs.com/package/http-server.
  - Open a browser console and navigate to localhost. Wait a few seconds to a few minutes.
*/

var rank = function(p){

  var sorted_words;
  var chron_range;

  p.setup = function(){

    var list_from_file = document.querySelector("#data-element > div");

    if(list_from_file == null){
      console.log("No file found, exiting.");
      return;
    }

    var len = list_from_file.childElementCount; // Number of most recent events to scan for searches.

    var searches_with_dates = [];

    var selected_data;
    var search_and_date;

    for(var i = 1; i < len + 1; i++){
      console.log("Running...("+i+"/"+len+")");
      selected_data = list_from_file.querySelector("div:nth-child("+i+") > div > div:nth-child(2)");
      if((selected_data.innerHTML.indexOf("Searched") != -1) && !(selected_data.querySelector("a") == null)){
        search_and_date = [selected_data.querySelector("a").innerHTML, Date.parse(selected_data.innerHTML.match("(?<=<br>).*")[0])];
        console.log("Match!");
        searches_with_dates.push(search_and_date);
      }
    };

    var flattened_words_with_dates = []; 

    for(var i = 0; i < searches_with_dates.length; i++){
        var words_in_search = searches_with_dates[i][0].split(/(?:,| )+/);  // Regex from https://stackoverflow.com/a/650031
        var search_time_ms = searches_with_dates[i][1];

        for(var j = 0; j < words_in_search.length; j++){
          flattened_words_with_dates.push([words_in_search[j], search_time_ms]);
        }
    };

    chron_range = [flattened_words_with_dates[flattened_words_with_dates.length - 1][1], flattened_words_with_dates[0][1]];

    var unique_words = [];
    var frequencies = {};
    var dates = {};

    var ignored_word_count = 0;

    var duplicate_count = 0;

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
          if(!(dates[active_word].includes(active_date))){ // Prevents duplicate entries
            frequencies[active_word]++;
            dates[active_word].push(active_date);
          }else{
            duplicate_count++;
          } 
        }
      }else{
        ignored_word_count++;
      }
    };

    var words_arr = [];

    for(var key in frequencies){
      words_arr.push([key, frequencies[key], dates[key]]);
    };

    // Sort words by frequency value
    sorted_words = words_arr.sort(function(a, b){return b[1]-a[1]; }); // https://gist.github.com/umidjons/9614157

    console.log("Found "+searches_with_dates.length+" searches in "+len+" events.");
    console.log("Unique words: "+unique_words.length+"\nTotal words: "+flattened_words_with_dates.length+"\nIgnored words: "+ignored_word_count);
    console.log(sorted_words);

    p.createCanvas(p.windowWidth,p.windowHeight);
    p.frameRate(30);

    p.rectMode(p.CENTER);


  };

  // Plot data
  p.draw = function(){

    var graphBorder = 50;
    var graphWidth = p.width - graphBorder, graphHeight = p.height-4*graphBorder;
    var graphCenter = p.createVector(p.width/2,p.height/2);

    p.background(128);
    
    p.push();
    p.fill(255);
    p.strokeWeight(3);
    p.stroke(100);
    p.rect(p.width/2,p.height/2,graphWidth, graphHeight);
    p.pop();

    // p.line(graphCenter.x - (graphWidth/2) + graphBorder,graphCenter.y + (graphHeight/2) - graphBorder, graphCenter.x + (graphWidth/2) - graphBorder, graphCenter.y + (graphHeight/2) - graphBorder);
    // p.line(graphCenter.x - (graphWidth/2) + graphBorder, graphCenter.y - (graphHeight/2) + graphBorder, graphCenter.x - (graphWidth/2) + graphBorder, graphCenter.y + (graphHeight/2) - graphBorder );

    var num_buckets = 40;

    var bucket_begin_dates = [];

    for(var i = 0; i < num_buckets + 1; i++){
      bucket_begin_dates.push(chron_range[0] + i * ( (chron_range[1]-chron_range[0])/num_buckets ) );
    }

    p.push();
    p.noStroke();
    var top_hits_to_plot = 20;

    var max_frequency = 0;

    for(var i = 0; i < top_hits_to_plot; i++){
      var col = p.round(p.map(i, 0, top_hits_to_plot,60, 220));
      p.fill(col);

      var current_word_data = sorted_words[i];
      var current_num_points = current_word_data[2].length;
      var plottable_data_points = [];
      var current_month_bins = {};

      p.beginShape();
      p.vertex(graphCenter.x - (graphWidth/2) + graphBorder, graphCenter.y + (graphHeight/2) - graphBorder);
      for(var j = 0; j < current_num_points; j++){
        var current_time = current_word_data[2][j];

        var month_bin = p.round(p.map(current_time , chron_range[0], chron_range[1],0 , num_buckets));
        
        if(current_month_bins[month_bin] != null){
          current_month_bins[month_bin]++;
        }else{
          current_month_bins[month_bin] = 1;
        }
      }

      for(var j = 0; j < num_buckets + 1; j++){
        if(!current_month_bins.hasOwnProperty(j)){
          current_month_bins[j] = 0;
        }
      }

      for(var j = 0; j < num_buckets + 1; j++){
        if(current_month_bins[j] > max_frequency){
          max_frequency = current_month_bins[j];
        }
      }

      for(key in current_month_bins){
        var current_x = p.map(key, 0, num_buckets, graphCenter.x - (graphWidth/2) + graphBorder, graphCenter.x + (graphWidth/2) - graphBorder);
        var current_y = p.map(current_month_bins[key], 0, max_frequency,  graphCenter.y + (graphHeight/2) - graphBorder, graphCenter.y - (graphHeight/2) + graphBorder);
        var rect_center_y = (current_y + (graphCenter.y + (graphHeight/2) - graphBorder)) / 2;
        var rect_height = (graphCenter.y + (graphHeight/2) - graphBorder) - current_y;
        var bin_width = ((graphCenter.x + (graphWidth/2) - graphBorder) - (graphCenter.x - (graphWidth/2) + graphBorder)) / num_buckets;
        
        p.vertex(current_x, current_y);
      }

      p.vertex(graphCenter.x + (graphWidth/2) - graphBorder, graphCenter.y + (graphHeight/2) - graphBorder);
      p.endShape();
    };
    p.pop();


    p.noLoop();
  };


  p.windowResized = function(){
    p.resizeCanvas(p.windowWidth,p.windowHeight);
    // p.background(255);
  };

};

