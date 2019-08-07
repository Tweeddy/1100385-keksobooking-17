'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var STATUS_CODE_OK = 200;
  var TIMEOUT = 2000;
  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('timeout', function () {
      onError('Время ожидания истекло');
    });
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open('POST', URL);
    xhr.send(data);
    return xhr;
  };
}());

