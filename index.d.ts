interface ParseOptions {
  /**
   * Allow parsing URLs that contain the TLDs specified under the "private" property
   * in the effective_tld_names.json file.
   */
  allowPrivateTLD?: boolean;
  /**
   * Allow parsing URLs that contain TLDs that are not in the effective_tld_names.json file.
   *
   * @note This option can also be used when parsing URLs that contain IP addresses.
   */
  allowUnknownTLD?: boolean;
}

interface ParseResult {
  tld: string;
  domain: string;
  sub: string;
}

declare function parse_url(
  remote_url: string,
  options?: ParseOptions
): ParseResult;

declare namespace parse_url {
  /**
   * Parse the hostname of a URL instead of the entire URL.
   *
   * @example parse_host('www.github.com') // { tld: 'com', domain: 'github.com', sub: 'www' }
   */
  export function parse_host(host: string, options?: ParseOptions): ParseResult;
}

export = parse_url;
