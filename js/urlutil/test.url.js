var assert = chai.assert;
var expect = chai.expect;

describe('URL', function() {
  describe('constructor', function() {
    it('should accept a normal url string', function() {
      var url = new URLutil("https://www.github.com");
      assert.equal(url.href, "https://www.github.com");
    });

    it('should preserve the trailing slash', function() {
      var url = new URLutil("https://www.github.com/");
      assert.equal(url.href, "https://www.github.com/");
    });

    it('should accept a url string and a base string', function() {
      var url = new URLutil("joyeecheung", "https://www.github.com");
      assert.equal(url.href, "https://www.github.com/joyeecheung");
    });

    it('should accept a url string with a leading slash', function() {
      var url = new URLutil("/joyeecheung", "https://www.github.com");
      assert.equal(url.href, "https://www.github.com/joyeecheung");
    });

    it('should accept a base string with a trailing slash', function() {
      var url = new URLutil("joyeecheung", "https://www.github.com/");
      assert.equal(url.href, "https://www.github.com/joyeecheung");
    });

    it('should accept a base string with a trailing slash'
       + ' and a url string with a leading slash', function() {
      var url = new URLutil("/joyeecheung", "https://www.github.com/");
      assert.equal(url.href, "https://www.github.com/joyeecheung");
    });

    it('should ignore the base string when the url string is absolute'
       , function() {
      var url = new URLutil("https://www.github.com/joyeecheung", "https://www.github.com/");
      assert.equal(url.href, "https://www.github.com/joyeecheung");
    });

  // -------------------------- Relaxed ------------------------
  //   it('should throw a SyntaxError for single url string without protocol'
  //      , function() {
  //     expect(function() {
  //       var url = new URLutil("/joyeecheung");
  //     }).to.throw(SyntaxError, '/joyeecheung is not valid');
  //   });

  //   it('should throw a SyntaxError for base url string without protocol'
  //      , function() {
  //     expect(function() {
  //       var url = new URLutil("/joyeecheung", "www.github.com");
  //     }).to.throw(SyntaxError, 'www.github.com is not valid');
  //   });
  // ------------------------------------------------------------


  });

  describe('Protocol', function() {
    it('should extract the right protocol for normal urls', function() {
      var cases = {
        'https': 'https://www.github.com',
        'http': 'http://www.github.com',
        'ws': 'ws://www.github.com',
        'file': 'file:///C:/joyee',
        'ftp': 'ftp://192.168.1.2'
      };

      for (var key in cases) {
        assert.equal(new URLutil(cases[key]).protocol, key);
      }
    });

    it('should be able to identify local protocols', function() {
      var cases = {
        'about': 'about:blank',
        'chrome': 'chrome://flags'
      };

      for (var key in cases) {
        assert.equal(new URLutil(cases[key]).protocol, key);
      }
    });

    it('should not be distrubed by ports', function() {
      var cases = {
        'https': 'https://www.github.com:2392/joyeecheung',
        'http': 'http://www.github.com:92/joyeecheung'
      };

      for (var key in cases) {
        assert.equal(new URLutil(cases[key]).protocol, key);
      }
    });
  });

  describe('Hash', function() {
    it('should identify normal hashes', function() {
      var cases = {
        'id': 'https://www.github.com/#id',
        '32411': 'https://tom.joe.co.uk/#32411',
        '324-1c': 'https://api.example.com/#324-1c',
        'chat-3241': 'https://17361.com/#chat-3241',
      };

      for (var key in cases) {
        assert.equal(new URLutil(cases[key]).hash, key);
      }
    });

    it('should identify common SPA hashes', function() {
      var cases = {
        '!/joyeecheung': 'https://twitter.com/#!/joyeecheung',
        'char0233.21': 'https://www.github.com/#char0233.21'
      };

      for (var key in cases) {
        assert.equal(new URLutil(cases[key]).hash, key);
      }
    });
  });

  describe('Host', function() {
    it('should identify the right host with only characters', function() {
      var cases = {
        'www.github.com': 'http://www.github.com',
        'www.github.com': 'https://www.github.com/',
        'tmp.api.github.com': 'https://tmp.api.github.com',
      };

      for (var key in cases) {
        assert.equal(new URLutil(cases[key]).host, key);
      }
    });

    it('should identify the right host with digits', function() {
      var cases = {
        'www.163.com': 'http://www.163.com',
        'www.github123.com': 'https://www.github123.com/',
        '122.api.github.com': 'https://122.api.github.com',
      };

      for (var key in cases) {
        assert.equal(new URLutil(cases[key]).host, key);
      }
    });

    it('should identify the right host with hyphens', function() {
      var cases = {
        'www.163-324.com': 'http://www.163-324.com',
        'www.git-hub.com': 'https://www.git-hub.com/',
        '122.api-33.github.com': 'https://122.api-33.github.com',
      };

      for (var key in cases) {
        assert.equal(new URLutil(cases[key]).host, key);
      }
    });
  });

  describe('Port', function() {
    it('should identify the right port', function() {
      var cases = {
        '2938': 'http://www.github.com:2938',
        '238': 'https://www.163.com:238',
        '28': 'https://www.163.com:28/joe/321',
      };

      for (var key in cases) {
        assert.equal(new URLutil(cases[key]).port, key);
      }
    });
  });
});
