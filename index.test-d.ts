import parse_url, { parse_host } from ".";
import { expectAssignable, expectError, expectType } from "tsd";

interface ParseResult {
  tld: string;
  domain: string;
  sub: string;
}

expectType<ParseResult>(parse_url(""));
expectType<ParseResult>(parse_url("", {}));
expectType<ParseResult>(parse_url("", { allowPrivateTLD: true }));
expectType<ParseResult>(parse_url("", { allowUnknownTLD: true }));
expectType<ParseResult>(
  parse_url("", { allowPrivateTLD: true, allowUnknownTLD: true })
);
expectType<ParseResult>(
  parse_url("", {
    allowPrivateTLD: true,
    allowUnknownTLD: true,
    allowDotlessTLD: true,
  })
);

expectType<ParseResult>(parse_host(""));
expectType<ParseResult>(parse_host("", {}));
expectType<ParseResult>(parse_host("", { allowPrivateTLD: true }));
expectType<ParseResult>(parse_host("", { allowUnknownTLD: true }));
expectType<ParseResult>(
  parse_host("", { allowPrivateTLD: true, allowUnknownTLD: true })
);
expectType<ParseResult>(
  parse_host("", {
    allowPrivateTLD: true,
    allowUnknownTLD: true,
    allowDotlessTLD: true,
  })
);

expectError<ParseResult>(parse_url());
expectError<ParseResult>(parse_url({}));
expectError<ParseResult>(parse_host());
expectError<ParseResult>(parse_host({}));

const testUrl = "https://github.com/131/node-tld/blob/master/index.js";
const testHostname = "github.com";
const testOptions = {
  allowPrivateTLD: true,
  allowUnknownTLD: true,
  allowDotlessTLD: true,
};

interface ParseOptions {
  allowPrivateTLD?: boolean;
  allowUnknownTLD?: boolean;
  allowDotlessTLD?: boolean;
}

expectAssignable<string>(testUrl);
expectAssignable<string>(testHostname);
expectAssignable<ParseOptions>(testOptions);
expectType<ParseResult>(parse_url(testUrl));
expectType<ParseResult>(parse_url(testUrl, testOptions));
expectType<ParseResult>(parse_host(testHostname));
expectType<ParseResult>(parse_host(testHostname, testOptions));
