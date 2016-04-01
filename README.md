# Motivation
Extract the TLD/domain/subdomain parts of an URL/hostname against mozilla TLDs 'official' listing .


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
