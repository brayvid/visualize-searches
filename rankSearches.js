/*  
    - This program requires a Youtube "MyActivity.html" file from Google. You can find yours at <https://takeout.google.com>.
    - Copy a "MyActivity.html" file into the directory that this file and the provided index.html file are in.
    - Start a local web server from the same directory. Go to localhost and open the console.
    - Wait a few seconds to a few minutes, depending on the size of your "MyActivity.html" file.
    - A text file containing your search terms ranked by frequency will download at the end.
*/


var final_list = []; // Stores results


var rank = function(p){

  var searches = [];
  var temp;


  p.setup = function(){
    p.noCanvas();
    p.noLoop();

    var len = document.querySelector("#data-element > div").childElementCount;

    console.log("Entries: "+len+". Starting scan.");

    for(var i = 1; i < len; i++){
      console.log("Running...("+i+"/"+len+")");
      temp = document.querySelector("#data-element > div > div:nth-child("+i+") > div > div:nth-child(2)");
      if(temp.innerHTML.indexOf("Searched") != -1){
        console.log("Match!");
        searches.push(document.querySelector("#data-element > div > div:nth-child("+i+") > div > div:nth-child(2) > a").innerHTML);
      }
    };

    console.log("Scan complete. Matches found: "+searches.length+". Starting sort.");

    var flattened_data = "";

    // p.save(searches,"my-youtube-search-history.txt");
    for(var i = 0; i < searches.length; i++){
        flattened_data  = flattened_data.concat(searches[i] + " ");
      }

    var splitted = flattened_data.split(" ");
    var words = [];

    for(var i=0; i<splitted.length; i++) {
        words[splitted[i]] = ( typeof words[splitted[i]] != 'undefined' ) ? words[splitted[i]]+=1 : 1;
      };

    var max_freq = 0;

    for (key_ in words) {
      if(words[key_] > max_freq){
        max_freq = words[key_];
      }
    };

    var counted_words = [];

    while(max_freq > 0){ 
      console.log('Sorting...');
      for(key_ in words){
          if(words[key_] == max_freq){
            if(!counted_words.includes(key_)){
              counted_words.push(key_);
              final_list.push(key_+" : "+words[key_]);
            } 
          } 
      }
      max_freq = max_freq - 1; 
    };
    console.log('Sort complete. Saving text file.');
    p.save(final_list,'youtube_keywords_ranked.txt');

  
  };

};