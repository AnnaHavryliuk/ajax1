'use strict'
onload = function () {
  var get = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState != xhr.DONE) return;

      var status = xhr.status;
      var headers = xhr.getAllResponseHeaders();
      var text = xhr.responseText;

      callback(status, headers, text);
    }

    xhr.send();
  }

  var appendImage = function (url) {
    var imgEl = document.createElement('img');

    imgEl.src = url;

    imgEl.onerror = function () {
      imgEl.classList.add('invisible');
    }

    document.getElementById('images').appendChild(imgEl);
  }

  var getImages = function (params) {
    var url = 'https://www.reddit.com/r/pics.json?'
      , category
      , limit = 100;

    if (!_.isEmpty(params)) {

      if (params.hasOwnProperty('category') && params.category !== 'pics') {
        category = params.category;
        url = url.replace('.json?', '/search.json?q=' + category + '&');
      }

      if (params.hasOwnProperty('limit')) {
        limit = params.limit;
      }
    }

    url += 'limit=' + limit;

    get(url, function (status, headers, body) {
      var response = JSON.parse(body);

      _.each(response.data.children, function (child) {
        var url = child.data.url;

        appendImage(url);
      });
    });
  }
  document.getElementById('get-images').addEventListener('click', function () {
    getImages({category: 'cats', limit: 5});
  });
}