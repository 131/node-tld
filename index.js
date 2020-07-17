"use strict";

var url = require('url');


var parse_url = function(remote_url, options) {
  if(typeof remote_url == "string")
    remote_url = url.parse(remote_url);
  return parse_host(remote_url.hostname, options);
};

var tlds = null;

var parse_host = function(host, options) {
  let allowPrivateTLD = options && options.allowPrivateTLD || false;
  let allowUnknownTLD = options && options.allowUnknownTLD || false;

  if(!tlds) {
    tlds = require('./effective_tld_names.json');
    tlds.combined = Object.assign({}, tlds.icann, tlds.private);
  }

  var parts = host.split(".");
  var stack = "", tld_level = -1;

  var roots = allowPrivateTLD ? tlds.combined : tlds.icann;

  for(var i = parts.length - 1, part; i >= 0; i--) {
    part = parts[i];
    stack = stack ? part + "." + stack : part;
    if(roots[stack])
      tld_level = roots[stack];
  }

  if(tld_level == -1 && allowUnknownTLD)
    tld_level = 1;

  if(parts.length <= tld_level || tld_level == -1)
    throw new Error("Invalid TLD " + JSON.stringify({parts, tld_level, allowUnknownTLD}));

  return  {
    tld     : parts.slice(-tld_level).join('.'),
    domain  : parts.slice(-tld_level - 1).join('.'),
    sub     : parts.slice(0, (-tld_level - 1)).join('.'),
  };
};




module.exports            = parse_url;
module.exports.parse_host = parse_host;


