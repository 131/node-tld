
[![Build Status](https://travis-ci.org/131/node-tld.svg?branch=master)](https://travis-ci.org/131/node-tld)
[![Coverage Status](https://coveralls.io/repos/github/131/node-tld/badge.svg?branch=master)](https://coveralls.io/github/131/node-tld?branch=master)
[![Version](https://img.shields.io/npm/v/tld-extract.svg)](https://www.npmjs.com/package/tld-extract)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)
[![Code style](https://img.shields.io/badge/code%2fstyle-ivs-green.svg)](https://www.npmjs.com/package/eslint-plugin-ivs)




# Motivation
Extract the TLD/domain/subdomain parts of an URL/hostname against [mozilla TLDs official listing](https://publicsuffix.org/).


# API

```
var parser = require('tld-extract');

console.log( parser("http://www.google.com") );
console.log( parser("http://google.co.uk") );
/**
* >> { tld: 'com', domain: 'google.com', sub: 'www' }
* >> { tld: 'co.uk', domain: 'google.co.uk', sub: '' }
*/

```
## Private TLDs
Private TLDs are supported, see [chromium source code for specs](https://chromium.googlesource.com/chromium/src/+/master/net/tools/tld_cleanup/tld_cleanup.cc)

```
console.log( parser("http://jeanlebon.cloudfront.net"));
/**
* >> { tld : 'net', domain : 'cloudfront.net', sub : 'jeanlebon' };
*/


console.log( parser("http://jeanlebon.cloudfront.net", {allowPrivateTLD : true}));
/**
* >> { tld : 'cloudfront.net', domain : 'jeanlebon.cloudfront.net', sub : '' };
*/
```

## Unknown TLDs (level0)
By default, unknown TLD throw an exception, you can allow them and use tld-extract as a parser using the `allowUnknownTLD` option

```
  parse("http://nowhere.local")
    >> throws /Invalid TLD/

  parse("http://nowhere.local", {allowUnknownTLD : true}))
    >> { tld : 'local', domain : 'nowhere.local', sub : '' }

```



# Why
* no dependencies
* really fast
* full code coverage
* easy to read (10 lines)
* easily updatable vs mozilla TLDs source list

# Maintenance
You can update the remote hash table using `npm run update`


# Not Invented Here

* A port of a [yks/PHP library](https://github.com/131/yks/blob/master/class/exts/http/urls.php)

* [tldextract](https://github.com/masylum/tldextract)  => bad API, (no need for async, "domain" property is wrong), no need for dependencies
* [tld](https://github.com/donpark/node-tld/blob/master/lib/tld.js) => (nothing bad, a bit outdated )
* [tld.js](https://github.com/ramitos/tld.js) => no sane way to prove/trust/update TLD listing


# Credits
* [131](https://github.com/131)
