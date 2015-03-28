;var util = (function() {
  'use strict';

  /***************** Mock data ********************/
  function mockData() {
    var mockName = ["John", "Doe", "Alice", "Simpson", "Peter", "Tom"];
    var mocNumber = ["12335221", "34591831", "423411134", "34240131", "42341231"];

    function select(iterable) {
      var idx = Math.floor(Math.random() * iterable.length);
      return iterable[idx];
    }

    return {
      get: function() {
        return {
          name: select(mockName),
          number: select(mocNumber)
        };
      }
    };
  }

  /***************** Promisified ajax ********************/
  function $http(url) {

    function ajaxPromise(resolve, reject) {
      var mock = mockData();
      var sometime = Math.random() * 2 * 1000; // 0 ~ 2s
      setTimeout(function() {
        var prob = Math.random();
        if (prob < 0.8) {
          resolve(mock.get());
        } else {
          reject({
            "error": "server error"
          });
        }
      }, sometime);
    }

    function ajax(method, url, args) {
      return new Promise(ajaxPromise);
    }

    return {
      'get': function(args) {
        return ajax('GET', url, args);
      },
      'post': function(args) {
        return ajax('POST', url, args);
      },
      'put': function(args) {
        return ajax('PUT', url, args);
      },
      'delete': function(args) {
        return ajax('DELETE', url, args);
      }
    };
  }

  /******* Exposed API of this module ******/
  return {
    $http: $http
  };

}());
