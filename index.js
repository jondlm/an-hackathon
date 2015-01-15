(function(document, chrome, $) {
  'use strict';

  var url = 'http://localhost:8081/';
  var languageCode = 'en';
  var sidebarUrl = chrome.extension.getURL('sidebar.html');
  var fields = $('[data-tr-key]');

  // Load sidebar
  $.get(sidebarUrl, function (sidebar) {
    document.body.innerHTML += sidebar;
    var nav = $('.tr-translation-navigation');
    $.getJSON(url + 'keys?language_code=en', function (items) {
      items.forEach(function (item) {
        nav.append(boxTemplate(item));
      });
    });

  });

  function boxTemplate (data) {
    return '' +
    '<div class="tr-translation">' +
      data.key +
      '<p class="tr-translation-value" title="click to edit">' +
        data.value +
      '</p>' +
    '</div>';
  }
})(document, chrome, $);
