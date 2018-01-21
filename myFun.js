  
var frequency = function(s){
  
  var list_elem = document.querySelector("#data-element > div");
  if(list_elem == null){
    console.log("No file found, exiting.");
    return;
  }

  var global_top_words; // Frequency-ranked unique words from the entire list
  
  var binned_top_words; // 

  var frequencies = {}; // Keys are unique words. Elements are numbers.
  var dates = {}; // Keys are unique words. Elements are arrays of datestamps.

  var num_bins = 16;

  var num_last_entries_to_check = list_elem.childElementCount; // Number of most recent events to scan for searches.


  /*  store all searches from list  */  

  var searches_with_dates = [];
  var selected_data;
  var search_and_date;

  for(var i = 1; i < num_last_entries_to_check + 1; i++){
    console.log("Running...("+i+"/"+num_last_entries_to_check+")");
    selected_data = list_elem.querySelector("div:nth-child("+i+") > div > div:nth-child(2)");
    if((selected_data.innerHTML.indexOf("Searched") != -1) && !(selected_data.querySelector("a") == null)){
      search_and_date = [selected_data.querySelector("a").innerHTML, Date.parse(selected_data.innerHTML.match("(?<=<br>).*")[0])];
      console.log("Match!");
      searches_with_dates.push(search_and_date);
    }
  };
  

  /*  Separate each word, keeping the timestamp associated with each word */

  var flattened_words_with_dates = []; 

  for(var i = 0; i < searches_with_dates.length; i++){
      var words_in_search = searches_with_dates[i][0].split(/(?:,| )+/);  // Regex from https://stackoverflow.com/a/650031
      var search_time_ms = searches_with_dates[i][1];

      for(var j = 0; j < words_in_search.length; j++){
        flattened_words_with_dates.push([words_in_search[j], search_time_ms]);
      }
  };


  /*  Sift list into unique terms and count all occurences of each */

  var chron_range = [flattened_words_with_dates[flattened_words_with_dates.length - 1][1], flattened_words_with_dates[0][1]];

  var unique_words = [];
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


  /*  Determine the start datestamp of each bin  */

  var bucket_begin_dates = [];

  for(var i = 0; i < num_bins + 1; i++){
    bucket_begin_dates.push(chron_range[0] + i * ( (chron_range[1]-chron_range[0])/num_bins) );
  }

  bucket_begin_dates.reverse();


  /*  Generate a frequency-per-bin for each unique word in a "timeline"  */

  var word_timeline = {};

  for(var active_word in dates){
    var active_timeline = [];
    var active_date_arr = dates[active_word];
    for(var i = 0; i < bucket_begin_dates.length - 1; i++){
      // for each bucket within each word
      var active_bucket_count = 0;
      for(var j = 0; j < active_date_arr.length; j++){
        if(active_date_arr[j] < bucket_begin_dates[i] && active_date_arr[j] >= bucket_begin_dates[i+1]){
          active_bucket_count++;
        }
      }
      active_timeline.push(active_bucket_count);
    }
    word_timeline[active_word] = active_timeline;
  };

  for(var key in word_timeline){
    word_timeline[key].reverse();
  };

  // console.log(word_timeline);


  var topWords = function(top){
    // Get n top words and save as array

    var top_words = [];

    for(var i = 0; i < num_bins; i++){
      var to_compare = [];
      for(active_word in word_timeline){
        to_compare.push([active_word, word_timeline[active_word][i]]);
      }
      to_compare.sort(function(a,b){return b[1]-a[1];});
      for(var j = 0; j < top; j++){
        var test = to_compare[j];
        if(!top_words.includes(test)){
          top_words.push(test);
        }
      }
    }

    top_words.sort(function(a,b){return b[1]-a[1]});
    
    for(var i = 0; i < top_words.length; i++){
      top_words[i] = top_words[i][0];
    }
    return top_words;
  };


  var all_maxes = [];
  for(active_word in word_timeline){
    var max_for_word = word_timeline[active_word].reduce(function(a, b) {return Math.max(a, b);});
    all_maxes.push(max_for_word);
  }
  var global_max_freq = all_maxes.reduce(function(a, b) {return Math.max(a, b);});


  s.setup = function(){
    s.createCanvas(s.windowWidth,s.windowHeight);
    s.frameRate(6);
    s.rectMode(s.CENTER);
    s.noStroke();
    s.textAlign(s.CENTER);

    s.num_top_words_to_display_per_bin_slider = s.createSlider(1, 10, 1, 1);
    s.num_top_words_to_display_per_bin_slider.position(10, 10);
    s.num_top_words_to_display_per_bin_slider.style('width', '80px');

    s.colors = [];
    for(var i = 0; i < 1000; i++){
      s.colors.push([s.random(50,225), s.random(50,225), s.random(50,225)]);
    }

  };

  s.draw = function(){

    var graphBorder = 50;
    var graphWidth = s.width - graphBorder, graphHeight = s.height-4*graphBorder;
    var graphCenter = s.createVector(s.width/2,s.height/2);

    s.background(128);
    s.rect(s.width/2,s.height/2,graphWidth, graphHeight);
    
    var words_to_plot = topWords( s.num_top_words_to_display_per_bin_slider.value() );


    s.push();

    for(var i = 0; i < words_to_plot.length; i++){

      s.fill(s.colors[i][0], s.colors[i][1], s.colors[i][2]);

      var active_word = words_to_plot[i];

      s.beginShape();

      s.vertex(graphCenter.x - (graphWidth/2) + graphBorder, graphCenter.y + (graphHeight/2) - graphBorder);
      for(var j = 0; j < num_bins; j++){

        var current_x = s.map(j, 0, num_bins, graphCenter.x - (graphWidth/2) + graphBorder, graphCenter.x + (graphWidth/2) - graphBorder);
        var current_y = s.map(word_timeline[active_word][j], 0, global_max_freq,  graphCenter.y + (graphHeight/2) - graphBorder, graphCenter.y - (graphHeight/2) + graphBorder);
        s.vertex(current_x, current_y);
      }
      s.vertex(graphCenter.x + (graphWidth/2) - graphBorder, graphCenter.y + (graphHeight/2) - graphBorder);
      
      s.endShape();
    };

    s.pop();

    var words_to_label = topWords(1);
    // var ordered_words_to_label = [];

    // for(var i = 0; i < words_to_label.length; i++){

    // };

    for(var i = 0; i < words_to_label.length; i++){
      s.push();
      var text_loc_x = s.map(i, 0, words_to_label.length - 1, graphCenter.x - (graphWidth/2) + graphBorder + 5, graphCenter.x + (graphWidth/2) - graphBorder);
      var active_word = words_to_label[i];
        s.fill(s.colors[i][0], s.colors[i][1], s.colors[i][2]);
        s.rect(text_loc_x, 3* graphBorder, 80, 20);
        s.fill(255);
        s.text(active_word,text_loc_x - 5, 3* graphBorder + 3);
        
      s.pop();
    }

    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    var begin_end_dates = [];
    var date_x_locs = [];
    for(var i = 0; i < 2; i++){
      var date_obj = new Date(chron_range[i]);
      var date_month = parseInt(date_obj.getMonth());
      begin_end_dates.push(months[date_month] + " "+date_obj.getFullYear());
      date_x_locs.push(s.map(i, 0, 1, graphCenter.x - (graphWidth/2) + (1.5* graphBorder), graphCenter.x + (graphWidth/2) - (1.5*graphBorder)));
    };

    s.push();
    s.fill(0);
    for(var i = 0; i < 2; i++){
      s.text(begin_end_dates[i],date_x_locs[i], (s.height/2)+(graphHeight/2) - (graphBorder/2));
    }  

    s.pop();



  };

  s.windowResized = function(){
    s.resizeCanvas(s.windowWidth,s.windowHeight);
  };


};
