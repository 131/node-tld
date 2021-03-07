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
    expect(parse.bind(null, "http://nowhere.local")).to.throwException(/Invalid TLD/);


    expect(parse("http://nowhere.local", {allowUnknownTLD : true})).to.eql({ tld : 'local', domain : 'nowhere.local', sub : '' });
    expect(parse(url.parse("http://nowhere.local"), {allowUnknownTLD : true})).to.eql({ tld : 'local', domain : 'nowhere.local', sub : '' });

    expect(parse('http://zhitomir.ua')).to.eql({ tld : 'zhitomir.ua', domain : 'zhitomir.ua', sub : '' });
  });


  it("should test private TLDs", function() {
    let aws_url = "http://ec2-23-20-71-128.compute-1.amazonaws.com/news/uk-news/2020/04/14/life-on-the-inside-10-ways-to-ease-an-anxious-mind-during-lockdown/";
    expect(parse(aws_url)).to.eql({ tld : 'com', domain : 'amazonaws.com', sub : 'ec2-23-20-71-128.compute-1' });

    expect(parse("http://jeanlebon.notaires.fr/")).to.eql({ tld : 'notaires.fr', domain : 'jeanlebon.notaires.fr', sub : '' });

    expect(parse("http://jeanlebon.cloudfront.net")).to.eql({ tld : 'net', domain : 'cloudfront.net', sub : 'jeanlebon' });
    expect(parse("http://jeanlebon.cloudfront.net", {allowPrivateTLD : true})).to.eql({ tld : 'cloudfront.net', domain : 'jeanlebon.cloudfront.net', sub : '' });
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
