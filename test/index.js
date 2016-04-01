"use strict";

var expect = require('expect.js');
var parse  = require('../');
var url    = require('url');

describe("Main test suite", function(){


  it("Should test parsing", function(){
    expect(parse("http://www.google.com")).to.eql({ tld: 'com', domain: 'google.com', sub: 'www' });
    expect(parse("http://free.fr")).to.eql({ tld: 'fr', domain: 'free.fr', sub: '' });
    expect(parse("http://google.co.uk")).to.eql({ tld: 'co.uk', domain: 'google.co.uk', sub: '' });
    expect(parse("http://bar.www.google.co.uk")).to.eql({ tld: 'co.uk', domain: 'google.co.uk', sub: 'bar.www' });


    expect(parse.bind(null, "http://nowhere")).to.throwException(/Invalid TLD/);
    expect(parse("http://nowhere.local")).to.eql({ tld: 'local', domain: 'nowhere.local', sub: '' });
    expect(parse(url.parse("http://nowhere.local"))).to.eql({ tld: 'local', domain: 'nowhere.local', sub: '' });
  });






});