/*  
    - This program needs a Youtube "MyActivity.html" file from Google. You can find yours at <https://takeout.google.com>.
    - Copy "MyActivity.html" into the directory that this file and the index.html file are in.
    - Start a local web server from the same directory. Go to localhost and open the console.
    - Wait a few seconds to several minutes, depending on the size of your "MyActivity.html" file.
*/

var final_list = [];

var rank = function(p){

  var searches = [];
  var temp;

  p.setup = function(){
    p.noCanvas();
    p.noLoop();

    var len = document.querySelector("#data-element > div").childElementCount;

    console.log("Entries: "+len+". Starting scan.");

    for(var i = 1; i < len + 1; i++){
      console.log("Running...("+i+"/"+len+")");
      temp = document.querySelector("#data-element > div > div:nth-child("+i+") > div > div:nth-child(2)");
      if(temp.innerHTML.indexOf("Searched") != -1){
        var temp2 = [document.querySelector("#data-element > div > div:nth-child("+i+") > div > div:nth-child(2) > a").innerHTML, Date.parse(temp.innerHTML.match("(?<=<br>).*")[0])];
        console.log("Match!");
        searches.push(temp2);
      }
    };

    console.log("Scan complete. Searches found: "+searches.length+".\nStarting sort.");

    var initTime = searches[searches.length - 1][1];
    var finalTime = searches[0][1];
    var millisInterval = 2629743000; // ~ 1 month
    var currentTime;
    var monthGroups = [];

    var numBins = p.round((finalTime - initTime)/millisInterval) + 1;
    console.log("Number of bins to sort: "+numBins+".");

    for(var i = 0; i < numBins; i++){
      monthGroups.push([]);
    }

    // Put each entry in the correct month's bin
    for(var i = searches.length - 1; i >= 0; i--){
      currentTime = searches[i][1];
      var correctBin = p.round(p.map(currentTime,initTime,finalTime,0,numBins - 1));
      monthGroups[correctBin].push(searches[i][0]); // Exclude timestamps
    };

    // Sort each bin by frequency
    for(var ind = 0; ind < numBins; ind++){

      var flattened_data = "";

      for(var i = 0; i < monthGroups[ind].length; i++){
          flattened_data  = flattened_data.concat(" " + monthGroups[ind] + " ");
      };

      var splitted = flattened_data.split(" ");

      flattened_data = "";

      for(var i = 0; i < splitted.length; i++){
          flattened_data  = flattened_data.concat("," + splitted[i] + ",");
      };

      splitted = flattened_data.split(",");

      var words = [];

      for(var i=0; i<splitted.length; i++) {
          words[splitted[i]] = ( typeof words[splitted[i]] != 'undefined' ) ? words[splitted[i]]+=1 : 1;   // http://jsfiddle.net/radek/2hzHM/3/
      };


      var max_freq = 0;

      for (key_ in words) {
        if(words[key_] > max_freq){
          max_freq = words[key_];
        }
      };

      var counted_words = [];
      var month_list = [];
      console.log("Max frequency in bin ("+(ind+1)+") : "+max_freq+".");

      while(max_freq > 0){ 
        console.log("Sorting...");
        for(key_ in words){
            if(words[key_] == max_freq){
              if(!counted_words.includes(key_)){
                counted_words.push(key_);
                month_list.push(key_+" : "+words[key_]);
              } 
            } 
        }
        max_freq = max_freq - 1; 
      };

      final_list.push(month_list);
  };



  console.log('Sorting complete. Results stored in variable \'final_list\'.');
  console.log(final_list);
  // p.save(final_list,'youtube_keywords_ranked.txt');

};

};


