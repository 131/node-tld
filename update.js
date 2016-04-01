"use strict";

var fs = require('fs');
var https = require('https');

var REMOTE_TLD_URL = "https://publicsuffix.org/list/effective_tld_names.dat";
var TLD_CACHE      = 'effective_tld_names.dat';
var TLD_CACHE_JSON = 'effective_tld_names.json';




var update = function(chain){
  var dest = fs.createWriteStream(TLD_CACHE);
  https.get(REMOTE_TLD_URL, function(res){
    res.pipe(dest);
    res.on("end", function(){
      parse(chain);
    });
  });
};


var parse = function(chain){
  var contents = fs.readFileSync(TLD_CACHE, 'utf-8');
  
  contents = contents.replace(new RegExp('//.*?$', 'mg'), "").trim();
  contents = contents.split(new RegExp('[ \t\r\n]+'));

  var tlds = {}, splitter = new RegExp("(\\!|\\*\\.)?(.*)");
  contents.forEach(function(line){
    if(!splitter.test(line)) return;
    line = splitter.exec(line);
    var tld = line[2], level = tld.split(".").length, modifier = line[1];
    if(modifier == "*.") level ++; else if(modifier == "!") level --;
    
    tlds[tld] = level;
  });
  fs.writeFileSync(TLD_CACHE_JSON, JSON.stringify(tlds, null, 2));
  chain();

};

update(console.log.bind(null, "All done") );

