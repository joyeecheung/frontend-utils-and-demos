var URLutil = (function() {
  'use strict';
  function URLutil(urlString, baseURLstring) {
    // enforces new
    if (!(this instanceof URLutil)) {
      return new URLutil(args);
    }

    var url = urlString, base = baseURLstring;

    // constructor body
    if (url.indexOf('/') === 0 && url !== '/')  // start with '/'
      url = url.substring(1)
    
    if (base) {
      var baseLen = base.length;
      if (base[baseLen - 1] === '/')  // trim trailing slash
        base = base.substring(0, baseLen - 1);

      if (getProtocol(url) !== null)  // url is absolute
        this.href = url;
      else
        this.href = [base, url].join('/');
    } else {
      this.href = url;
    }

    this.protocol = getProtocol(this.href);
    this.hash = getHash(this.href);
    this.host = getHost(this.href);
    this.port = getPort(this.href);
  }

  function getFirstCapture(re, str) {
    var match = str.match(re);
    return match === null ? match : match[1];
  }

  function getProtocol(href) {
    return getFirstCapture(/^(\w+?):/, href);
  }

  function getHash(href) {
    var hashIdx = href.lastIndexOf('#');
    if (hashIdx !== -1) {
      return href.substring(hashIdx + 1, href.length);
    } else {
      return null;
    }
  }

  function getHost(href) {
    return getFirstCapture(/^\w+?:\/\/([\w\d-\.]+)/, href);
  }

  function getPort(href) {
    return getFirstCapture(/^\w+?:\/\/[\w-\.]+:(\d+)/, href);
  }

  function getPathname(href) {
    var pathname = href.replace(/^\w+?:\/\/[\w-\.]+:?(\d*)/, '');
    var queryIdx = pathname.indexOf('?');
    if (queryIdx !== -1) {
      pathname = pathname.substring(0, queryIdx);
    }

    var hashIdx = pathname.lastIndexOf('#');
    if (hashIdx !== -1) {
      pathname = pathname.substring(0, hashIdx);
    }

    return pathname;
  }

  function getParams(href) {
    var match,
        pl     = /\+/g,  // Regex for replacing '+' with a space
        search = /([^&=]+)=?([^&]*)/g;

    function decode(str) {
      return decodeURIComponent(str.replace(pl, " "));
    }

    var query = href.match(/\?(\S+)$/)[1];

    var params = {};
    while (match = search.exec(query))
      params[decode(match[1])] = decode(match[2]);

    return params;
  }

  return URLutil;
}());