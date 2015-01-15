(function(document, chrome, $) {
  'use strict';

  var sidebarUrl = chrome.extension.getURL("sidebar.html");
  var fields = document.querySelectorAll('[data-tr-key]');

  Array.prototype.forEach.call(fields, function(x) {
    x.classList.add('to-edit');
  });

  $.get(sidebarUrl, function(sidebar) {
    document.body.innerHTML += sidebar;
  });
})(document, chrome, $);
