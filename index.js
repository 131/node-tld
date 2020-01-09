"use strict";

var url = require('url');

var TLD_CACHE_JSON = './effective_tld_names.json';

var parse_url = function(remote_url, onlyValidTLD) {
  if(typeof remote_url == "string")
    remote_url = url.parse(remote_url);
  return parse_host(remote_url.hostname, onlyValidTLD);
};

var tlds = null;
var parse_host = function(host, onlyValidTLD) {
  if(!tlds)
    tlds = require(TLD_CACHE_JSON);

  onlyValidTLD = onlyValidTLD || false;

  var parts = host.split(".");
  var stack = "", tldFound = false, tld_level = 1; //unknown tld are 1st level
  for(var i = parts.length - 1, part; i >= 0; i--) {
    part = parts[i];
    stack = stack ? part + "." + stack : part;

    if(!tlds[stack]) break;
    tldFound = true;
    tld_level = tlds[stack];
  }

  if(onlyValidTLD && !tldFound || parts.length <= tld_level)
    throw new Error("Invalid TLD");

  return  {
    tld     : parts.slice(-tld_level).join('.'),
    domain  : parts.slice(-tld_level - 1).join('.'),
    sub     : parts.slice(0, (-tld_level - 1)).join('.'),
  };
};




module.exports            = parse_url;
module.exports.parse_host = parse_host;


