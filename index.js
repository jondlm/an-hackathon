(function(d) {
  'use strict';

  var fields = document.querySelectorAll('[data-tr-key]');

  Array.prototype.forEach.call(fields, function(x) {
    x.classList.add('to-edit');
  });


})(document);
