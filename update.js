"use strict";

var fs = require('fs');
var https = require('https');

var REMOTE_TLD_URL = "https://publicsuffix.org/list/effective_tld_names.dat";
var TLD_CACHE      = 'effective_tld_names.dat';
var TLD_CACHE_JSON = 'effective_tld_names.json';




var update = function(chain) {
  var dest = fs.createWriteStream(TLD_CACHE);
  https.get(REMOTE_TLD_URL, function(res) {
    res.pipe(dest);
    res.on("end", function() {
      parse(chain);
    });
  });
};


// ===BEGIN ICANN DOMAINS===
// ===END ICANN DOMAINS===
// ===BEGIN PRIVATE DOMAINS===
// ===END PRIVATE DOMAINS===

var parse = function(chain) {
  var contents = fs.readFileSync(TLD_CACHE, 'utf-8');

  let section;


  const sections = new RegExp('^//\\s*===BEGIN (ICANN|PRIVATE) DOMAINS===\\s*$');
  const comment  = new RegExp('^//.*?');
  const splitter = new RegExp("(\\!|\\*\\.)?(.+)");

  const tlds = {};

  const lines = contents.split(new RegExp('[\r\n]+'));

  for(let line of lines) {
    line = line.trim();

    if(sections.test(line)) {
      section = (sections.exec(line)[1]).toLowerCase();
      tlds[section] = {};
      continue;
    }
    if(comment.test(line))
      continue;
    if(!splitter.test(line))
      continue;
    if(!section)
      continue;

    line = splitter.exec(line);
    var tld  = line[2],
      level = tld.split(".").length,
      modifier = line[1];

    if(modifier == "*.") level++;
    if(modifier == "!") level--;

    tlds[section][tld] = level;
  }

  if(!(tlds.icann && tlds.private))
    throw `Error in TLD parser`;

  fs.writeFileSync(TLD_CACHE_JSON, JSON.stringify(tlds, null, 2));
  chain();

};

update(console.log.bind(null, "All done"));

