"use strict";

var expect = require('expect.js');
var parse  = require('../');
var url    = require('url');

describe("Main test suite", function() {


  it("Should test parsing", function() {
    expect(parse("http://www.google.com")).to.eql({ tld : 'com', domain : 'google.com', sub : 'www' });
    expect(parse("http://free.fr")).to.eql({ tld : 'fr', domain : 'free.fr', sub : '' });
    expect(parse("http://google.co.uk")).to.eql({ tld : 'co.uk', domain : 'google.co.uk', sub : '' });

    expect(parse("http://bar.www.google.co.uk")).to.eql({ tld : 'co.uk', domain : 'google.co.uk', sub : 'bar.www' });
    expect(parse("https://google.co.uk:8081/api/thing?q=something")).to.eql({ tld : 'co.uk', domain : 'google.co.uk', sub : '' });


    expect(parse.bind(null, "http://nowhere")).to.throwException(/Invalid TLD/);
    expect(parse("http://nowhere.local")).to.eql({ tld : 'local', domain : 'nowhere.local', sub : '' });
    expect(parse(url.parse("http://nowhere.local"))).to.eql({ tld : 'local', domain : 'nowhere.local', sub : '' });
  });


  it("should test from github issues", function() {


    var tests = [];

    //.za is only level 2
    tests.push([
      "https://www.moneyweb.co.za/news/tech/siemens-jv-eyes-tesla-topping-battery-for-australias-grid/",
      {tld : 'co.za', domain : 'moneyweb.co.za', sub : 'www' }
    ]);

    for(var test of tests)
      expect(parse(test[0])).to.eql(test[1]);

  });





});
